import React, { useEffect } from 'react';
import './Fight.css';

const LeaderboardTable = (props) => {

    // triggers when data changes
    useEffect(() => {
        console.log(props.data)
    }, [props.data]);

    const renderRows = () => {
        if (!props.data) {
            console.log('now rows to render!')
            return null;
        }

        return (
            props.data['data'].map((charData, index) => {
                return (
                    <tr>
                        <th scope='row'>{charData['place']+1}</th>
                        {/* <td>{charData['Class']}</td> */}
                        <td><div className={'class-icon class-'+charData['Class']}></div></td>
                        <td>{charData['name']}</td>
                        <td>{charData['TFights']}</td>
                        <td>{charData['TWins']}</td>
                        <td>{(charData['Twr']*100).toFixed(1)}%</td>
                    </tr>
                )
            })
        );
    };

    return (
        <div>
            Showing {props.data && props.data['data']['length']} out of {props.data && props.data['total_matched']} results found:
            <table className='table table-hover table-lg'>
                <thead>
                    <tr>
                        <th scope='col'>Place</th>
                        <th scope='col'>Class</th>
                        <th scope='col'>Character</th>
                        <th scope='col'>Fights</th>
                        <th scope='col'>Wins</th>
                        <th scope='col'>Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

export default LeaderboardTable;