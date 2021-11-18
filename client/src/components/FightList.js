import React from 'react'
import { getFightsList } from '../services/FightService';
import Fight from './Fight';

class FightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('FightList did update')
        // check to make sure something in props changed, to avoid inifinite loop:
        if (this.props.fightIDs !== prevProps.fightIDs) {
            // console.log(this.props.fightIDs)
            this.fetchData();
        }
    }

    fetchData() {
        // return if list is empty to avoid requesting ALL fights from API (API does this for empty request)
        if (this.props.fightIDs.length == 0) {
            return;
        }

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
            <div>
                <h2>Showing {this.state.fightDatas && this.state.fightDatas.length} fights:</h2>
                {this.renderFights()}
            </div>
        );
    }
}

export default FightList;