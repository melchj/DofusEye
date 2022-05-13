import React from "react";
import CharLeaderboardQuery from "../components/CharLeaderboardQuery";
import LeaderboardTable from "../components/LeaderboardTable";

const LeaderboardPage = () => {

    return (
        <div>
            {/* TODO: finish leaderboard page and remove below message... */}
            <div className="btn-danger">
                this leaderboard page is EXTRA unfinished... there might be improvements in a few days! ... or maybe a few months, who knows...
            </div>
            <h1>Character Leaderboards</h1>
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <h3>Filters:</h3>
                    <CharLeaderboardQuery/>
                </div>
            </div>
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <LeaderboardTable/>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage;