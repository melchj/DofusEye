import React from 'react'
import { getFight } from '../services/FightService'
import './Fight.css'

const Fight = () => {

    let [fightID, setFightID] = React.useState('')
    let [fightData, setFightData] = React.useState('')

    const fetchData = (e) => {
        getFight(fightID)
        .then((resp) => {
            // console.log(resp)
            setFightData(resp)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const inputChange = (e) => {
        // console.log(e.target.value)
        setFightID(e.target.value);
    }

    const classStyle = (pos) => {
        const p = pos+"_class";
        const cl = fightData && (" class-"+fightData[p]);
        // console.log(cl);

        var className = "class-icon me-3";
        className += cl;

        return className
    }

    const numsOnly = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="form-group">
                    <input type="text" onKeyPress={(e) => numsOnly(e)} onChange={(e) => inputChange(e)} className="form-control" name="fightid" id="fightid" placeholder="Fight ID" />
                    <button onClick={(e) => fetchData(e)} type='button' className="btn btn-primary">Load Fight ID</button>
                </div>
            </div>
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <div className="row">
                        <h2 className="card-title">Fight #{fightData && fightData.fight_id}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Winners</h3>
                            <div className="row align-items-center"><div className={classStyle('w1')}></div>{fightData.w1_name}</div>
                            <div className="row align-items-center"><div className={classStyle('w2')}></div>{fightData.w2_name}</div>
                            <div className="row align-items-center"><div className={classStyle('w3')}></div>{fightData.w3_name}</div>
                            <div className="row align-items-center"><div className={classStyle('w4')}></div>{fightData.w4_name}</div>
                            <div className="row align-items-center"><div className={classStyle('w5')}></div>{fightData.w5_name}</div>
                        </div>
                        <div className="col-md-6">
                            <h3>Losers</h3>
                            <div className="row align-items-center"><div className={classStyle('l1')}></div>{fightData.l1_name}</div>
                            <div className="row align-items-center"><div className={classStyle('l2')}></div>{fightData.l2_name}</div>
                            <div className="row align-items-center"><div className={classStyle('l3')}></div>{fightData.l3_name}</div>
                            <div className="row align-items-center"><div className={classStyle('l4')}></div>{fightData.l4_name}</div>
                            <div className="row align-items-center"><div className={classStyle('l5')}></div>{fightData.l5_name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fight