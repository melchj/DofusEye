import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getCharLeaderboard } from "../services/ApiService";

const CharLeaderboardQuery = () => {
    // set up input states
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [minFightsValue, setMinFightsValue] = useState(1)
    const [classValue, setClassValue] = useState('all');
    const [sortValue, setSortValue] = useState('wr');
    // TODO: make the formatting look nice :D

    const navigate = useNavigate(); // this is to programmatically go to new route
    const location = useLocation(); // using this to trigger useEffect when route changes

    // triggers when route changes, and when component loads
    useEffect(() => {
        updateLeaderboard()
    }, [location]);

    const updateLeaderboard = () => {
        // fetch the data
        // TODO: deal with pagination? currently just doing page 0 with 50 per page...
        getCharLeaderboard(startDate.getTime()/1000, endDate.getTime()/1000, classValue, sortValue, minFightsValue, 1, 50)
        .then((resp) => {
            console.log(resp)
            // TODO: display the returned data...
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/leaderboard?_page=1&_per_page=5&class=feca&min_fights=30')
        console.log(`submit clicked! class=${classValue}, minfights=${minFightsValue}, start=${startDate.getTime()/1000}, end=${endDate.getTime()/1000}, sort=${sortValue}`)
    }

    return (
        <div>
            <Form
            onSubmit={handleSubmit}
            >
                <div>
                    <label>Class:</label>
                    <select className="form-select" value={classValue} onChange={(e) => {setClassValue(e.target.value)}}>
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