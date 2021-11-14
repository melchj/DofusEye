import React from 'react'
import { getFight, getFightsByCharacter, getFightsList } from '../services/FightService';
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
        // call API to get a list of fight data to put in this.state
        getFightsList(this.props.fightIDs)
        .then((resp) => {
            this.setState({fightDatas: resp});
        })
        .catch((error) => {
            console.log(error);
        })

        // call API to get all fights for a given character name
        // getFightsByCharacter('lucent')
        // .then((resp) => {
        //     this.setState({fightDatas: resp});
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }

    renderAllFights() {
        if (!this.state.fightDatas) {
            console.log('FightList: no fights to render, fightDatas is null...')
            return null;
        }

        return (
            this.state.fightDatas.map((fightData, index) => {
                // console.log('rendering Fight index: '+index);
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
                <h2>Showing {this.state.fightDatas && this.state.fightDatas.length} fights:</h2>
                {this.renderAllFights()}
            </div>
        );
    }
}

export default FightList;