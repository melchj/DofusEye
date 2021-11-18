import React from 'react'
// import './Stats.css'

class Stats extends React.Component {

    render() {
        return (
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <h2>stats for xxxxx</h2>
                    <div className="row">
                        <div className='col'>
                        <h3>All Fights:</h3>
                        <table className="table table-hover table-sm w-25">
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
                                    <td>50</td>
                                    <td>70</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>40</td>
                                    <td>55</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>10</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>80%</td>
                                    <td>79%</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <div className='col'>
                        <h3>Attacks:</h3>
                        <table className="table table-hover table-sm w-25">
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
                                    <td>50</td>
                                    <td>70</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>40</td>
                                    <td>55</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>10</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>80%</td>
                                    <td>79%</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <div className='col'>
                        <h3>Defences:</h3>
                        <table className="table table-hover table-sm w-25">
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
                                    <td>50</td>
                                    <td>70</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>40</td>
                                    <td>55</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Loses</th>
                                    <td>10</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>80%</td>
                                    <td>79%</td>
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