import React from 'react'
import { getFight } from '../services/FightService'
import './Fight.css'

class Fight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fightID: null,
            fightData: null
        };
    }

    fetchData = (e) => {
        getFight(this.state.fightID)
        .then((resp) => {
            // console.log(resp)
            // setFightData(resp)
            this.setState({fightData: resp});
        })
        .catch((error) => {
            console.log(error)
        });
    }

    inputChange = (e) => {
        // console.log(e.target.value)
        // setFightID(e.target.value);
        this.setState({fightID: e.target.value});
    }

    classStyle = (pos) => {
        const p = pos+"_class";
        const cl = this.state.fightData && (" class-"+this.state.fightData[p]);
        // console.log(cl);

        var className = "class-icon me-3";
        className += cl;

        return className
    }

    numsOnly = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="form-group">
                        <input type="text" onKeyPress={(e) => this.numsOnly(e)} onChange={(e) => this.inputChange(e)} className="form-control" name="fightid" id="fightid" placeholder="Fight ID" />
                        <button onClick={(e) => this.fetchData(e)} type='button' className="btn btn-primary">Load Fight ID</button>
                    </div>
                </div>
                <div className="card text-dark bg-light mt-3">
                    <div className="card-body">
                        <div className="row">
                            <h2 className="card-title">Fight #{this.state.fightData && this.state.fightData.fight_id}</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Winners</h3>
                                <div className="row align-items-center"><div className={this.classStyle('w1')}></div>{this.state.fightData && this.state.fightData.w1_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('w2')}></div>{this.state.fightData && this.state.fightData.w2_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('w3')}></div>{this.state.fightData && this.state.fightData.w3_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('w4')}></div>{this.state.fightData && this.state.fightData.w4_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('w5')}></div>{this.state.fightData && this.state.fightData.w5_name}</div>
                            </div>
                            <div className="col-md-6">
                                <h3>Losers</h3>
                                <div className="row align-items-center"><div className={this.classStyle('l1')}></div>{this.state.fightData && this.state.fightData.l1_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('l2')}></div>{this.state.fightData && this.state.fightData.l2_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('l3')}></div>{this.state.fightData && this.state.fightData.l3_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('l4')}></div>{this.state.fightData && this.state.fightData.l4_name}</div>
                                <div className="row align-items-center"><div className={this.classStyle('l5')}></div>{this.state.fightData && this.state.fightData.l5_name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fight