import React from 'react'
import { getBasicCharacterStats } from '../services/FightService';
// import './Stats.css'

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.characterName !== prevProps.characterName) {
            this.fetchData();
        }
    }

    fetchData() {
        // call API
        getBasicCharacterStats(this.props.characterName)
        .then((resp) => {
            this.setState({characterStats: resp});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <h2>Stats for {this.props.characterName}</h2>
                    <div className="row">
                        <div className='col'>
                        <h3>All Fights:</h3>
                        <table className="table table-hover table-sm w-50">
                            <thead>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>5v5</th>
                                    <th scope='col'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5Total']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllTotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5Wins']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>{this.state.characterStats && (this.state.characterStats['5v5Total'] - this.state.characterStats['5v5Wins'])}</td>
                                    <td>{this.state.characterStats && (this.state.characterStats['AllTotal'] - this.state.characterStats['AllWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['5v5Wins'] / this.state.characterStats['5v5Total']).toFixed(0)}%</td>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['AllWins'] / this.state.characterStats['AllTotal']).toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <div className='col'>
                        <h3>Attacks:</h3>
                        <table className="table table-hover table-sm w-50">
                            <thead>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>5v5</th>
                                    <th scope='col'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5ATotal']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllATotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5AWins']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllAWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>{this.state.characterStats && (this.state.characterStats['5v5ATotal'] - this.state.characterStats['5v5AWins'])}</td>
                                    <td>{this.state.characterStats && (this.state.characterStats['AllATotal'] - this.state.characterStats['AllAWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['5v5AWins'] / this.state.characterStats['5v5ATotal']).toFixed(0)}%</td>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['AllAWins'] / this.state.characterStats['AllATotal']).toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <div className='col'>
                        <h3>Defences:</h3>
                        <table className="table table-hover table-sm w-50">
                            <thead>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>5v5</th>
                                    <th scope='col'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5DTotal']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllDTotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{this.state.characterStats && this.state.characterStats['5v5DWins']}</td>
                                    <td>{this.state.characterStats && this.state.characterStats['AllDWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>{this.state.characterStats && (this.state.characterStats['5v5DTotal'] - this.state.characterStats['5v5DWins'])}</td>
                                    <td>{this.state.characterStats && (this.state.characterStats['AllDTotal'] - this.state.characterStats['AllDWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['5v5DWins'] / this.state.characterStats['5v5DTotal']).toFixed(0)}%</td>
                                    <td>{this.state.characterStats && (100 * this.state.characterStats['AllDWins'] / this.state.characterStats['AllDTotal']).toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <h3>Activity Chart:</h3>
                            <p>(insert here: a chart of the past month or two or something)</p>
                        </div>
                        <div className='col'>
                            <h3>Nemesis:</h3>
                            <p>(most common enemy)</p>
                            <p>uhh idk</p>
                        </div>
                        <div className='col'>
                            <h3>Best Friend:</h3>
                            <p>(most common teammate)</p>
                            <p>hmmm</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;