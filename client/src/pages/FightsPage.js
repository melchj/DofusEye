import { useLocation } from "react-router-dom";
import FightList from "../components/FightList";


const FightsPage = () => {

    const search = useLocation().search;
    const fights = new URLSearchParams(search).get('f');

    return (
        <div>
            <FightList
                fightIDs={fights.split(',').map(Number)}
            />
        </div>
    );
}

export default FightsPage;