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

    # print(results)
    return results