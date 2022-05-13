import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CharLeaderboardQuery = () => {
    // set up input states
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [classValue, setClassValue] = useState('all');
    const [sortValue, setSortValue] = useState('wr');
    // TODO: add minfights state
    // TODO: convert start/end date to unix time
    // TODO: make the formatting look nice :D
    // TODO: actually make the api call...

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/leaderboard?class=test&idk')
        console.log(`submit clicked! class=${classValue}, minfights=${0}, start=${startDate}, end=${endDate}, sort=${sortValue}`)
    }

    return (
        <div>
            <Form
            // onChange={handleInputChange}
            onSubmit={handleSubmit}
            >
                <div>
                    <label>Class:</label>
                    <select className="form-select" value={classValue} onChange={(e) => {setClassValue(e.target.value)}}>
                        {['all','eni','feca','panda','cra','eca','osa','xel','elio','masq','ougi','sacri','hup','iop','sadi','sram','enu','fog','rogue'].map(
                            (item) => (
                                <option value={item} key={item}>{item}</option>
                            )
                        )}
                    </select>
                </div>
                <div>
                    <label>Minimum Fights:</label>
                    {/* TODO: technically, type="number" means it only works with numbers.. but probably need to show user in other way too (and that min=0) */}
                    <input type="number" className="form-control" min="0" defaultValue="0"/>
                </div>
                <div>
                    <label>Start Date:</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                </div>
                <div>
                    <label>End Date:</label>
                    {/* TODO: check that end date is AFTER start date */}
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
                </div>
                <div>
                    <label>Sort By:</label>
                    <select className="form-select" value={sortValue} onChange={(e) => {setSortValue(e.target.value)}}>
                        <option value="wr">Win Rate</option>
                        <option value="wins">Number of Wins</option>
                        <option value="numfights">Number of Fights</option>
                    </select>
                </div>
                <div className="form-row">
                    <Button className="success" type="submit">Apply Filters!</Button>
                </div>
            </Form>
        </div>
    )
}

export default CharLeaderboardQuery;