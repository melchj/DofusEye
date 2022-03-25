import pandas as pd

def filterFights(fightList, charName, attacks=True, defs=True, wins=True, losses=True):
    '''
    accepts a list of fights, character name, and some filters.
    returns the list of fights that has been filtered appropriately.

    fightList - dictionary of fights (like from schema_fights.dump(fightQueryResult))
    '''
    # first, handle some dumb cases
    # if (attacks and defs):
    #     return None
    # if (~attacks and ~defs):
    #     return None
    # if (wins and losses):
    #     return None
    # if (~wins and ~losses):
    #     return None

    # TODO: add filters for 5v5, 5v4, etc.
    # print(f"gonna filter list with target '{charName}'... a={attacks}, d={defs}, w={wins}, l={losses}")
    fights = pd.DataFrame(fightList)
    filters = pd.DataFrame()

    # add TRUE/FALSE column for if it was a win
    filters['won'] = (
        fights['w1_name'].str.contains(charName, case=False) |
        fights['w2_name'].str.contains(charName, case=False) |
        fights['w3_name'].str.contains(charName, case=False) |
        fights['w4_name'].str.contains(charName, case=False) |
        fights['w5_name'].str.contains(charName, case=False)
        )
    
    # make new 'sword' DF, replace empty sword values with 'l1' just in case
    temp = fights['sword'].replace({r'', None}, 'l1', regex=True)
    # True/False column to know if target character was on the attacking team ('*' is AND, '|'is OR logical operators)
    attackerSide = temp.apply(lambda x: x.lower()[0]) # make column of just the 'l' or 'w' letters
    # make TRUE/FALSE column in filter about if fight was attack or not
    filters['attack'] = ((attackerSide == 'w') * filters['won']) | ((attackerSide == 'l') * ~filters['won'])

    # get number of of players on each team
    # fights['w_num'] = fights[['w1_class', 'w2_class', 'w3_class', 'w4_class', 'w5_class']].notnull().sum(axis=1)
    # fights['l_num'] = fights[['l1_class', 'l2_class', 'l3_class', 'l4_class', 'l5_class']].notnull().sum(axis=1)

    # apply filters
    filters['total'] = (
        ((filters['won'] * wins) | (~filters['won'] * losses))
        *
        ((filters['attack'] * attacks) | (~filters['attack'] * defs))
    )

    fights = fights[filters['total']]

    # return fights.to_json()
    # replace NaNs in the dead columns with zeros (to avoid a JSON parse error)
    fights['w1_dead'] = fights['w1_dead'].fillna(0)
    fights['w2_dead'] = fights['w2_dead'].fillna(0)
    fights['w3_dead'] = fights['w3_dead'].fillna(0)
    fights['w4_dead'] = fights['w4_dead'].fillna(0)
    fights['w5_dead'] = fights['w5_dead'].fillna(0)
    fights['l1_dead'] = fights['l1_dead'].fillna(0)
    fights['l2_dead'] = fights['l2_dead'].fillna(0)
    fights['l3_dead'] = fights['l3_dead'].fillna(0)
    fights['l4_dead'] = fights['l4_dead'].fillna(0)
    fights['l5_dead'] = fights['l5_dead'].fillna(0)
    return fights

def charactersInFights(fightList):
    '''
    takes a list of fights and returns a list of all characters in these fights.
    the list of characters includes basic stats:
        - attack wins
        - attack losses
        - def wins
        - def losses
    for each character listed.
    '''
    fights = pd.DataFrame(fightList)

    print(fights)

    # TODO: there must be a better way to do this with a dataframe than this "dictionary of lists" appreach
    # character stats list-like object
    charList = {}

    # function to add up character wins/losses, to be applied on each row of fightslist df
    def addCharacterScores(fight):
        # print(f"-----fight #{fight['fight_id']}-----")
        # loop thru all positions
        positions = ['w1', 'w2', 'w3', 'w4', 'w5', 'l1', 'l2', 'l3', 'l4', 'l5']
        sword = fight['sword'] if fight['sword'] else 'w1'
        for p in positions:
            name = fight[f"{p}_name"]
            if name is None:
                continue
            # result for this player? 0 = attack win, 1 = att loss, 2 = def win, 3 = def loss
            attack = 0 if (p[0] == sword[0].lower()) else 2
            win = 0 if (p[0] == 'w') else 1
            res = attack + win
            
            # add to dictionary of lists object
            if name in charList:
                charList[name][res] = charList[name][res] + 1
            else:
                charList[name] = [0, 0, 0, 0, fight[f"{p}_class"]]
                charList[name][res] = 1

    # apply to all rows, "axis=1" so the function recieve each "row" of the df
    fights.apply(addCharacterScores, axis=1)
    
    # convert dictionary of lists to a dataframe
    charDF = pd.DataFrame.from_dict(charList, orient='index')
    charDF.columns = ['AWins', 'ALosses', 'DWins', 'DLosses', 'Class']

    # add a few other stats
    charDF['TWins'] = charDF['AWins'] + charDF['DWins']
    charDF['TLosses'] = charDF['ALosses'] + charDF['DLosses']
    charDF['Twr'] = charDF['TWins'] / (charDF['TWins'] + charDF['TLosses'])
    charDF['TFights'] = charDF['TWins'] + charDF['TLosses']
    # print(charDF)

    return charDF