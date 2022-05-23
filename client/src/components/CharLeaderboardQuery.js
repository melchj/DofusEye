import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getCharLeaderboard } from "../services/ApiService";

const CharLeaderboardQuery = () => {
    // default filter dates
    var date2 = new Date()
    var date1 = new Date()
    date1.setDate(date2.getDate() - 7) // 7 days prior to today
    // set up input states
    const [startDate, setStartDate] = useState(date1);
    const [endDate, setEndDate] = useState(date2);
    const [minFightsValue, setMinFightsValue] = useState(5)
    const [dclassValue, setDClassValue] = useState('all');
    const [sortValue, setSortValue] = useState('wr');
    // TODO: make the formatting look nice :D

    const navigate = useNavigate(); // this is to programmatically go to new route
    // const location = useLocation(); // using this to trigger useEffect when route changes

    // TODO: can handleSubmit() be simplified by react-router-dom's "useSearchParams" hook instead of useState???
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: better handling of default values in this query string?
        // specifically start/end datetimes generally have decimal in the default value :O
        // TODO: also, pagination....
        navigate('/leaderboard?_page=1&_per_page=50&dclass='+dclassValue+'&min_fights='+minFightsValue+'&start_date='+(startDate.getTime()/1000)+'&end_date='+(endDate.getTime()/1000)+'&_sort='+sortValue)
    }

    return (
        <div>
            <Form
            onSubmit={handleSubmit}
            >
                <div>
                    <label>Class:</label>
                    <select className="form-select" value={dclassValue} onChange={(e) => {setDClassValue(e.target.value)}}>
                        {[
                            'all',
                            'eni',
                            'feca',
                            'panda',
                            'cra',
                            'eca',
                            'osa',
                            'xel',
                            'elio',
                            'masq',
                            'ougi',
                            'sacri',
                            'hup',
                            'iop',
                            'sadi',
                            'sram',
                            'enu',
                            'fog',
                            'rogue'
                        ].map((item) => (
                                <option value={item} key={item}>{item}</option>
                            )
                        )}
                    </select>
                </div>
                <div>
                    <label>Minimum Fights:</label>
                    {/* TODO: technically, type="number" means it only works with numbers.. but probably need to show user in other way too (and that min=0) */}
                    <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={minFightsValue}
                        onChange={(e) => {setMinFightsValue(e.target.value)}}
                    />
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
                    <select
                        className="form-select"
                        value={sortValue}
                        onChange={(e) => {setSortValue(e.target.value)}}
                    >
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