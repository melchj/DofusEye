import React from 'react'
import { getFight } from '../services/FightService';
import Fight from './Fight';

class FightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: i am not sure if using props to set initial state is ok... might need to follow up
            fightDatas: Array(this.props.fightIDs.length),
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const fightDatas = this.state.fightDatas.slice();

        // loop through all fightIDs in this component's properties
        // and fetch their data from the API helper
        // TODO: fetch all at once from API with a single api call?...
        this.props.fightIDs.map((fightID, i) => {
            getFight(fightID)
            .then((resp) => {
                fightDatas[i] = resp;
                this.setState({fightDatas: fightDatas});
            })
            .catch((error) => {
                console.log(error);
            })
        });
    }

    renderAllFights() {
        if (!this.state.fightDatas) {
            console.log('no fights to render, fightDatas is null...')
            return null;
        }

        return (
            this.state.fightDatas.map((fightData, index) => {
                console.log('rendering Fight index: '+index);
                // console.log(fightData['fight_id']);
                return (
                    <div key={fightData['fight_id']}>
                        {this.renderFight(index)}
                    </div>
                    );
            })
        );
    }

    renderFight(i) {
        return (
            <Fight
                fightData={this.state.fightDatas && this.state.fightDatas[i]}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderAllFights()}
            </div>
        );
    }
}

export default FightList;