import React, { useEffect, useState } from 'react'
import { getBasicCharacterStats } from '../services/ApiService';
import './Fight.css'

const Stats = (props) => {
    const [ characterStats, setCharacterStats ] = useState()

    useEffect(() => {
        fetchData();
    }, [props.characterName])

    const fetchData = () => {
        if (!props.characterName) {
            return;
        }
        getBasicCharacterStats(props.characterName)
        .then((resp) => {
            setCharacterStats(resp)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="card text-dark bg-light mt-3">
            <div className="card-body">
                <div className="row">
                    <div className="text-center">
                        <h2>{props.characterName}</h2>
                        {characterStats && (
                            <div className={"class-icon class-" + characterStats['charClass']}></div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className='col'>
                        <h3>All Fights:</h3>
                        <table className="table table-hover table-sm w-50">
                            <thead>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>5v5</th>
                                    <th scope='col'>All</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{characterStats && characterStats['5v5Total']}</td>
                                    <td>{characterStats && characterStats['AllTotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{characterStats && characterStats['5v5Wins']}</td>
                                    <td>{characterStats && characterStats['AllWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Losses</th>
                                    <td>{characterStats && (characterStats['5v5Total'] - characterStats['5v5Wins'])}</td>
                                    <td>{characterStats && (characterStats['AllTotal'] - characterStats['AllWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{characterStats && (100 * characterStats['5v5Wins'] / characterStats['5v5Total']).toFixed(0)}%</td>
                                    <td>{characterStats && (100 * characterStats['AllWins'] / characterStats['AllTotal']).toFixed(0)}%</td>
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
                                    <th scope='col'>All</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{characterStats && characterStats['5v5ATotal']}</td>
                                    <td>{characterStats && characterStats['AllATotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{characterStats && characterStats['5v5AWins']}</td>
                                    <td>{characterStats && characterStats['AllAWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Losses</th>
                                    <td>{characterStats && (characterStats['5v5ATotal'] - characterStats['5v5AWins'])}</td>
                                    <td>{characterStats && (characterStats['AllATotal'] - characterStats['AllAWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{characterStats && (100 * characterStats['5v5AWins'] / characterStats['5v5ATotal']).toFixed(0)}%</td>
                                    <td>{characterStats && (100 * characterStats['AllAWins'] / characterStats['AllATotal']).toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='col'>
                        <h3>Defenses:</h3>
                        <table className="table table-hover table-sm w-50">
                            <thead>
                                <tr>
                                    <th scope='col'></th>
                                    <th scope='col'>5v5</th>
                                    <th scope='col'>All</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'># Fights</th>
                                    <td>{characterStats && characterStats['5v5DTotal']}</td>
                                    <td>{characterStats && characterStats['AllDTotal']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Wins</th>
                                    <td>{characterStats && characterStats['5v5DWins']}</td>
                                    <td>{characterStats && characterStats['AllDWins']}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Losses</th>
                                    <td>{characterStats && (characterStats['5v5DTotal'] - characterStats['5v5DWins'])}</td>
                                    <td>{characterStats && (characterStats['AllDTotal'] - characterStats['AllDWins'])}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Winrate</th>
                                    <td>{characterStats && (100 * characterStats['5v5DWins'] / characterStats['5v5DTotal']).toFixed(0)}%</td>
                                    <td>{characterStats && (100 * characterStats['AllDWins'] / characterStats['AllDTotal']).toFixed(0)}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='row'>
                    {/* <div className='col'>
                        <h3>Activity Chart:</h3>
                        <p>(TODO: insert here: a chart of the past month or two or something)</p>
                    </div> */}
                    <div className='col'>
                        <h3>Best Friends:</h3>
                        <p>(most common allies)</p>
                        <ul>
                            {characterStats && characterStats['most common allies'] && Object.keys(characterStats['most common allies']).map((key, i) => (
                                <li key={i}>{key}, {characterStats['most common allies'][key]}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>Rivals:</h3>
                        <p>(most common enemies)</p>
                        <ul>
                            {characterStats && characterStats['most common enemies'] && Object.keys(characterStats['most common enemies']).map((key, i) => (
                                <li key={i}>{key}, {characterStats['most common enemies'][key]}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <h3>Most Wins vs:</h3>
                        <ul>
                            {characterStats && characterStats['most often beat'] && Object.keys(characterStats['most often beat']).map((key, i) => (
                                <li key={i}>{key}, {characterStats['most often beat'][key]}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>Most Losses vs:</h3>
                        <ul>
                            {characterStats && characterStats['most often beaten by'] && Object.keys(characterStats['most often beaten by']).map((key, i) => (
                                <li key={i}>{key}, {characterStats['most often beaten by'][key]}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;