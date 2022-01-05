import React, { useEffect, useState } from 'react'
import { getFightsList } from '../services/FightService';
import Fight from './Fight';

// class FightList extends React.Component {
const FightList = (props) => {
    const [fightIDs, setFightIDs] = useState([]);
    const [fightDatas, setFightDatas] = useState([]);
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     };
    // }

    // componentDidMount() {
    //     this.fetchData();
    // }

    // triggers when fightIDs changes
    useEffect(() => {
        fetchData();
    }, [props.fightIDs]);

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // console.log('FightList did update')
    //     // check to make sure something in props changed, to avoid inifinite loop:
    //     if (this.props.fightIDs !== prevProps.fightIDs) {
    //         // console.log(this.props.fightIDs)
    //         this.fetchData();
    //     }
    // }

    const fetchData = () => {
        // return if list is empty to avoid requesting ALL fights from API (API does this for empty request)
        if (props.fightIDs.length == 0) {
            return;
        }

        // call API to get a list of fight data to put in this.state,
        // which is passed to child Fight components (component and sub components re-rendered when state updates)
        getFightsList(props.fightIDs)
        .then((resp) => {
            // this.setState({fightDatas: resp});
            setFightDatas(resp);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const renderFights = () => {
        if (!fightDatas) {
            // console.log('FightList: no fights to render, fightDatas is null...')
            return null;
        }

        // take this.state.fightDatas and put into array, and sort (order) it. want fights listed in high->low fight ID order
        const sortedFightDatas = [].concat(fightDatas)
            .sort((a, b) => b.fight_id - a.fight_id)

        return (
            sortedFightDatas.map((fightData, index) => {
                return (
                    <div className="col-md-6" key={fightData.fight_id}>
                        <Fight fightData={fightData} target={props.target}/>
                    </div>
                );
            })
        );
    }

    // handleOptionChange(event) {
    //     let { name, value } = event.target;
    //     this.setState( { [name]:value } );
    //     console.log('name: ' + name)
    //     console.log('value: ' + value)
    // }

    // render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2>Showing {fightDatas && fightDatas.length} fights:</h2>
                </div>
                {/* <div className='col-12'> */}
                    {/* <div className="col-4 btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="checkbox" className="btn-check" name="btnradio" id="btnradio1" onChange={handleOptionChange}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">
                            Radio 1
                        </label>

                        <input type="checkbox" className="btn-check" name="btnradio" id="btnradio2" onChange={handleOptionChange}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">
                            Radio 2
                        </label>

                        <input type="checkbox" className="btn-check" name="btnradio" id="btnradio3" onChange={handleOptionChange}/>
                        <label className="btn btn-outline-primary" htmlFor="btnradio3">
                            Radio 3
                        </label>
                    </div> */}
                {/* </div> */}
                {/* {this.state} */}
                {renderFights()}
            </div>
        );
    // }
}

export default FightList;