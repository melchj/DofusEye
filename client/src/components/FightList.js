import React from 'react'
import { getFight, getFightsByCharacter, getFightsList } from '../services/FightService';
import Fight from './Fight';

class FightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: i am not sure if using props to set initial state is ok... might need to follow up
            // fightDatas: Array(this.props.fightIDs.length),
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // call API to get a list of fight data to put in this.state, which is passed to child Fight components
        getFightsList(this.props.fightIDs)
        .then((resp) => {
            this.setState({fightDatas: resp});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderFights() {
        if (!this.state.fightDatas) {
            // console.log('FightList: no fights to render, fightDatas is null...')
            return null;
        }

        return (
            this.state.fightDatas.map((fightData, index) => {
                // console.log('rendering Fight index: '+index);
                // console.log(fightData['fight_id']);
                return (
                    <div key={fightData['fight_id']}>
                        <Fight fightData={this.state.fightDatas && this.state.fightDatas[index]}/>
                    </div>
                    );
            })
        );
    }

    render() {
        return (
            <div className="container">
                <h2>Showing {this.state.fightDatas && this.state.fightDatas.length} fights:</h2>
                {this.renderFights()}
            </div>
        );
    }
}

export default FightList;