import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                        <td>
                            <Link to={ '/character/'+charData['name'] } className="text-body name-link">
                                {charData['name']}
                            </Link>
                        </td>
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
            <div>
                Found {props.data && props.data['total_matched']} characters with at least {props.data && props.data['filters']['min_fights']} full 5v5 fight(s) between {props.data && props.data['filters']['start_date']} and {props.data && props.data['filters']['end_date']}.
                Showing the top {props.data && props.data['data']['length']} (sorted by {props.data && props.data['filters']['sort']}) below!
            </div>
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