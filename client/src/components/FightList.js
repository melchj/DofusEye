import React from 'react'
import { getFight } from '../services/FightService';
import Fight from './Fight';

class FightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // fights: new Array(),
            // fights: Array(3).fill(Fight),
            fightDatas: Array(3).fill(null),
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // const squares = this.state.squares.slice();
        // squares[i] = 'X';
        // this.setState({squares: squares});
        const fightDatas = this.state.fightDatas.slice();

        getFight(22)
        .then((resp) => {
            fightDatas[0] = resp;
            this.setState({fightDatas: fightDatas});
        })
        .catch((error) => {
            console.log(error)
        });

        getFight(23)
        .then((resp) => {
            fightDatas[1] = resp;
            this.setState({fightDatas: fightDatas});
        })
        .catch((error) => {
            console.log(error)
        });

        getFight(656)
        .then((resp) => {
            fightDatas[2] = resp;
            this.setState({fightDatas: fightDatas});
        })
        .catch((error) => {
            console.log(error)
        });
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
                <div>
                    <button
                        onClick={() => this.fetchData()}
                        type='button'
                        className="btn btn-primary"
                    >
                        Load Fights
                    </button>
                </div>
                <div>
                    {this.renderFight(0)}
                </div>
                <div>
                    {this.renderFight(1)}
                </div>
                <div>
                    {this.renderFight(2)}
                </div>
            </div>
        );
    }
}

export default FightList;