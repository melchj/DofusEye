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

            <h2>About the Data</h2>
            <div>
                The data currently comes entirely from screenshots posted on the Free Ringtones discord server. The screenshots are analyzed by a bot which reads names and classes and stores them in a database.
            </div>
            <div>
                This method has some limitations:
                <ul>
                    <li>Screenshots are not always posted to the discord channel. People forget, or crash, or are not in Free Ringtones to begin with.</li>
                    <li>The bot is not 100% accurate at reading names and classes. Sometimes it messes up and the data reflected on this app is inaccurate until the fight data is corrected.</li>
                </ul>
            </div>

            <h2>Future Plans</h2>
            <div>
                This is a side project that I work on when I have time. Some potential future features are listed here. This list is not complete and does not show what features have priority.
                <ul>
                    <li>Making Discord Bot available to other guilds/servers, to get more data for this app outside of Free Ringtones.</li>
                    <li>Leaderboards/Ladders</li>
                    <li>A way to easily make corrections to screenshots that the bot misread. (to get the data more accurate).</li>
                    <li>Stats for classes, accounts, guilds, etc...</li>
                    <li>idk... more to come. message Chonk on discord with ideas/feedback/whatever.</li>
                </ul>
            </div>
        </div>
    );
}