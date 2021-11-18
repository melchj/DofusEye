import React from 'react'
import './Fight.css'

class Fight extends React.Component {
    classStyle = (pos) => {
        const p = pos+"_class";
        const cl = this.props.fightData && (" class-"+this.props.fightData[p]);

        var className = "class-icon me-3";
        className += cl;

        return className
    }

    render() {
        return (
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <div className="row">
                        <h2 className="card-title">Fight #{this.props.fightData && this.props.fightData.fight_id}</h2>
                        <p>Attacker: {this.props.fightData.sword}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Winners</h3>
                            <div className="row align-items-center"><div className={this.classStyle('w1')}></div>{this.props.fightData && this.props.fightData.w1_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('w2')}></div>{this.props.fightData && this.props.fightData.w2_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('w3')}></div>{this.props.fightData && this.props.fightData.w3_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('w4')}></div>{this.props.fightData && this.props.fightData.w4_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('w5')}></div>{this.props.fightData && this.props.fightData.w5_name}</div>
                        </div>
                        <div className="col-md-6">
                            <h3>Losers</h3>
                            <div className="row align-items-center"><div className={this.classStyle('l1')}></div>{this.props.fightData && this.props.fightData.l1_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('l2')}></div>{this.props.fightData && this.props.fightData.l2_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('l3')}></div>{this.props.fightData && this.props.fightData.l3_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('l4')}></div>{this.props.fightData && this.props.fightData.l4_name}</div>
                            <div className="row align-items-center"><div className={this.classStyle('l5')}></div>{this.props.fightData && this.props.fightData.l5_name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Fight