from collections import defaultdict
import pandas as pd

# take a list of fights and a target character and return dict of stat results
def getCharacterStats(fightList, charName):
    fights = pd.DataFrame(fightList)
    # print(fights.head())

    # ---- prep the dataframe(s) ----
    # True/False column to know if target character on winning team
    fights['won'] = (
        fights['w1_name'].str.contains(charName, case=False) |
        fights['w2_name'].str.contains(charName, case=False) |
        fights['w3_name'].str.contains(charName, case=False) |
        fights['w4_name'].str.contains(charName, case=False) |
        fights['w5_name'].str.contains(charName, case=False)
        )

    # in the sword (attacker) column, replace empty values with "l1" for this analysis
    # TODO: these should probably be caught farther upstream somewhere and handled there. idk if 'l1' is the best default
    temp = fights['sword'].replace(r'', 'l1', regex=True)

    # True/False column to know if target character was on the attacking team ('*' is AND, '|'is OR logical operators)
    attackerSide = temp.apply(lambda x: x.lower()[0]) # make column of just the 'l' or 'w' letters
    fights['attack'] = ((attackerSide == 'w') * fights['won']) | ((attackerSide == 'l') * ~fights['won'])

    # remove anything that originated from the bot test channel
    # TODO: remove necessity for this...
    fights = fights[fights['channel_id'] != 862470344798240769]

    # get number of of players on each team
    fights['w_num'] = fights[['w1_class', 'w2_class', 'w3_class', 'w4_class', 'w5_class']].notnull().sum(axis=1)
    fights['l_num'] = fights[['l1_class', 'l2_class', 'l3_class', 'l4_class', 'l5_class']].notnull().sum(axis=1)

    # add column for the date
    # TODO: the way the timezone is stored in the DB is messed up... need to fix everywhere :'(... the -60*60*4 is a workaround
    fights['date'] = pd.to_datetime(fights['date']-60*60*4, unit='s')
    fights['day'] = fights['date'].dt.floor('D')

    # DFs for attacks and defs
    attacks = fights[fights['attack'] == True]
    defs = fights[fights['attack'] == False]

    # DFs for only 5v5s
    fights5v5 = fights[fights['w_num'] == 5]
    fights5v5 = fights5v5[fights5v5['l_num'] == 5]
    attacks5v5 = fights5v5[fights5v5['attack'] == True]
    defs5v5 = fights5v5[fights5v5['attack'] == False]

    # ---- analyze the prepped data ----
    results = dict()
    results['5v5Total'] = int(len(fights5v5))
    results['5v5Wins'] = int(fights5v5['won'].sum())
    results['AllTotal'] = int(len(fights))
    results['AllWins'] = int(fights['won'].sum())

    results['5v5ATotal'] = int(len(attacks5v5))
    results['5v5AWins'] = int(attacks5v5['won'].sum())
    results['AllATotal'] = int(len(attacks))
    results['AllAWins'] = int(attacks['won'].sum())

    results['5v5DTotal'] = int(len(defs5v5))
    results['5v5DWins'] = int(defs5v5['won'].sum())
    results['AllDTotal'] = int(len(defs))
    results['AllDWins'] = int(defs['won'].sum())

    # ---- look at teammates/enemies ----
    wonFights = fights[fights['won']] # all fights with player on WINNERS team
    lostFights = fights[~fights['won']] # all fights with player on LOSERS team

    # lists of teammates/enemies
    winTeammates = wonFights[['w1_name', 'w2_name', 'w3_name', 'w4_name', 'w5_name']]
    loseTeammates = lostFights[['l1_name', 'l2_name', 'l3_name', 'l4_name', 'l5_name']]
    allTeammates = pd.concat([winTeammates, loseTeammates], axis=1)
    winEnemies = wonFights[['l1_name', 'l2_name', 'l3_name', 'l4_name', 'l5_name']]
    loseEnemies = lostFights[['w1_name', 'w2_name', 'w3_name', 'w4_name', 'w5_name']]
    allEnemies = pd.concat([winEnemies, loseEnemies], axis=1)

    # flatten to one column
    allTeammates = allTeammates.stack().reset_index()[0]
    winEnemies = winEnemies.stack().reset_index()[0]
    loseEnemies = loseEnemies.stack().reset_index()[0]
    allEnemies = allEnemies.stack().reset_index()[0]

    # get most common teammate/enemy stats
    # TODO: need to handle the error if the character does not have that many teammates/enemies lol
    # TODO: need to make the returned enemies/teammates more consistent -- curently inconsistent when there are multiple characters with the exact same number of occurances
    dd = defaultdict(list)
    results['most common allies'] = allTeammates.value_counts()[1:4].to_dict(dd)
    results['most common enemies'] = allEnemies.value_counts()[0:3].to_dict(dd)
    results['most often beat'] = winEnemies.value_counts()[0:3].to_dict(dd)
    results['most often beaten by'] = loseEnemies.value_counts()[0:3].to_dict(dd)

    # print(results)
    return results

def getCharacterClass(fightList, charName):
    """
    returns the class(es) of the character
    """
    fights = pd.DataFrame(fightList)

    classes = pd.Series()
    for p in ['w1', 'w2', 'w3', 'w4', 'w5', 'l1', 'l2', 'l3', 'l4', 'l5']:
        temp = fights[fights[f'{p}_name'].str.contains(charName, case=False, na=False)][f"{p}_class"]
        classes = classes.append(temp)
    # print(classes)

    # print(classes.value_counts())
    # print(classes.value_counts().index[0])

    # TODO: need to support multiple classes
    # returns the most common class in the series
    return classes.value_counts().index[0]