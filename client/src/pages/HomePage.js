import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

    return (
        <div>
            <h1>Welcome to DofusEye!</h1>
            <div>
                This is a side project I've been working on for the Dofus guild Free Ringtones.
                The goal is to collect data from Perceptor fight screenshots posted in the guild's Discord, then use this app to navigate through that data in a meaningful way.
            </div>
            <div>
                This whole project is very experimental and mostly just for my own learning rather than to ship a finished product. We'll see what it becomes.
            </div>
            <div className='text-center'>
                <h2> Start here: </h2>
                <div className='m-2'>
                    <Link to='/character'>
                        <button className="btn btn-primary">Search for a character!!</button>
                    </Link>
                </div>
                    <div className='m-2'>
                        <Link to='/account'>
                            <button className="btn btn-primary" disabled>Search for an account!!</button>
                        </Link>
                    <div>(the Account search is not yet implemented, come back soon!)</div>
                </div>
            </div>
        </div>
    );
}