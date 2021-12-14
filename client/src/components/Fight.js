import React from 'react'
import Modal from "react-bootstrap/Modal"
import { getFightImage } from '../services/FightService';
import './Fight.css'

class Fight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            image: null,
        };
    }

    classStyle = (pos) => {
        const p = pos+"_class";
        const cl = this.props.fightData && (" class-"+this.props.fightData[p]);

        var className = "class-icon me-3";
        className += cl;

        return className;
    }

    renderCharacter(pos) {
        const posName = pos+"_name";
        // const posClass = pos+"_class";
        const posDead = pos+"_dead";

        if (this.props.fightData) {
            if (this.props.fightData[posName] == null) {
                // if pos_name == null, then no character here, skip this
                return null;
            }

            var isDead = this.props.fightData[posDead] == 1
            var isAttacker = this.props.fightData.sword.toUpperCase() === pos.toUpperCase();

            return (
                <div className="row align-items-center">
                    <div className={this.classStyle(pos)}></div>
                    {this.props.fightData && this.props.fightData[posName]}
                    {isDead && <div className="dead-icon"></div>}
                    {isAttacker && <div className="attacker-icon"></div>}
                </div>
                );
        }
        return null;
    }

    showModal() {
        this.setState({modalOpen: true})

        // if we haven't fetched the image, get it from the server
        if (this.props.fightData && this.state.image == null) {
            getFightImage(this.props.fightData.fight_id)
            .then((resp) => {
                this.setState({image: resp});
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    hideModal() {
        this.setState({modalOpen: false})
        // TODO: delete the image from state? for memory usage or something?
    }

    render() {
        return (
            <div className="card text-dark bg-light mt-3">
                <div className="card-body">
                    <div className="row">
                        <h2 className="card-title">Fight ID: {this.props.fightData && this.props.fightData.fight_id}</h2>
                        {/* <p>{this.props.fightData.date}</p> */}
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Winners</h3>
                            {this.renderCharacter('w1')}
                            {this.renderCharacter('w2')}
                            {this.renderCharacter('w3')}
                            {this.renderCharacter('w4')}
                            {this.renderCharacter('w5')}
                        </div>
                        <div className="col-md-6">
                            <h3>Losers</h3>
                            {this.renderCharacter('l1')}
                            {this.renderCharacter('l2')}
                            {this.renderCharacter('l3')}
                            {this.renderCharacter('l4')}
                            {this.renderCharacter('l5')}
                        </div>
                    </div>
                    <div className='row'>
                        <button className="btn btn-primary" onClick={this.showModal.bind(this)}>screenshot</button>
                    </div>
                </div>

                <Modal show={this.state.modalOpen} onHide={this.hideModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.state.image} className='img-fluid'/>
                    </Modal.Body>
                    <Modal.Footer>This is the footer</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Fight