import React from 'react';

const LeaderboardTable = (props) => {

    return (
        <div>
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
                    <tr>
                        <th scope='row'>1</th>
                        <td>eca</td>
                        <td>character 1</td>
                        <td>100</td>
                        <td>69</td>
                        <td>69%</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>feca</td>
                        <td>character 2</td>
                        <td>1000</td>
                        <td>42</td>
                        <td>4.2%</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>eni</td>
                        <td>character 3</td>
                        <td>55</td>
                        <td>3</td>
                        <td>5.5%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LeaderboardTable;