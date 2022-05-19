import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import CharLeaderboardQuery from "../components/CharLeaderboardQuery";
import LeaderboardTable from "../components/LeaderboardTable";
import { getCharLeaderboard } from "../services/ApiService";

const LeaderboardPage = () => {
    const [sParams, setSearchParams] = useSearchParams();
    const [queryData, setQueryData] = useState(null)

    const location = useLocation(); // using this to trigger useEffect when route changes

    // triggers when route changes, and when component loads
    useEffect(() => {
        getCharLeaderboard(sParams.get('start_date'), sParams.get('end_date'), sParams.get('dclass'), sParams.get('_sort'), sParams.get('min_fights'), 1, 50)
        .then((resp) => {
            // console.log(resp)
            setQueryData(resp)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [location]);


    return (
        <div>
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
                    <LeaderboardTable
                        data={queryData}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage;