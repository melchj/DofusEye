import React, { useEffect, useState } from 'react'
import { getFightsList } from '../services/FightService';
import Fight from './Fight';

// class FightList extends React.Component {
const FightList = (props) => {
    const [fightDatas, setFightDatas] = useState([]);

    const [checkWin, setCheckWin] = useState(true);
    const [checkLoss, setCheckLoss] = useState(true);

    const [checkAttack, setCheckAttack] = useState(true);
    const [checkDef, setCheckDef] = useState(true);

    // triggers when fightIDs changes
    useEffect(() => {
        fetchData();
    }, [props.fightIDs]);

    const fetchData = () => {
        // return if list is empty to avoid requesting ALL fights from API (API does this for empty request)
        if (props.fightIDs.length == 0) {
            return;
        }

        // call API to get a list of fight data to put in this.state,
        // which is passed to child Fight components (component and sub components re-rendered when state updates)
        getFightsList(props.fightIDs)
        .then((resp) => {
            setFightDatas(resp);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const renderFights = () => {
        if (!fightDatas) {
            return null;
        }

        // take this.state.fightDatas and put into array, and sort (order) it. want fights listed in high->low fight ID order
        const sortedFightDatas = [].concat(fightDatas)
            .sort((a, b) => b.fight_id - a.fight_id)

        return (
            sortedFightDatas.map((fightData, index) => {
                return (
                    <div className="col-md-6" key={fightData.fight_id}>
                        <Fight fightData={fightData} target={props.target}/>
                    </div>
                );
            })
        );
    }

    const handleApplyFilters = () => {
        console.log('apply filters...')
    }

    return (
        <div className="row">
            <div className="col-12">
                <h2>Showing {fightDatas && fightDatas.length} fights:</h2>
            </div>
            <div className='col-12'>
                <div className="btn-group me-3" role="group">
                    <input type="checkbox" className="btn-check" name="checkWin" id="checkWin" onChange={() => {setCheckWin(!checkWin)}} checked={checkWin}/>
                    <label className="btn btn-outline-dark" htmlFor="checkWin">
                        Wins
                    </label>

                    <input type="checkbox" className="btn-check" name="checkLoss" id="checkLoss" onChange={() => {setCheckLoss(!checkLoss)}} checked={checkLoss}/>
                    <label className="btn btn-outline-dark" htmlFor="checkLoss">
                        Losses
                    </label>
                </div>

                <div className="btn-group me-3" role="group">
                    <input type="checkbox" className="btn-check" name="checkAttack" id="checkAttack" onChange={() => {setCheckAttack(!checkAttack)}} checked={checkAttack}/>
                    <label className="btn btn-outline-dark" htmlFor="checkAttack">
                        Attacks
                    </label>

                    <input type="checkbox" className="btn-check" name="checkDef" id="checkDef" onChange={() => {setCheckDef(!checkDef)}} checked={checkDef}/>
                    <label className="btn btn-outline-dark" htmlFor="checkDef">
                        Defs
                    </label>
                </div>

                <div className='btn-group'>
                    <button className="btn btn-success float-end" onClick={handleApplyFilters}>Apply Filters</button>
                </div>
            </div>
            {renderFights()}
        </div>
    );
}

export default FightList;