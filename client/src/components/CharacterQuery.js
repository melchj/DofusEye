import React from 'react'

class CharacterQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onQuery() {
        // console.log(this.state);
        this.props.onClickHandler(this.state.characterName);
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            // input-group mb-3 
            <div className='input-group row g-3'>
                <div className='col-auto'>
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Character Name"
                        aria-label="Character Name"
                        name="characterName"
                        onChange={(e) => this.onInputChange(e)}
                        />
                </div>
                <div className="col-auto">
                    <button type="submit" onClick={this.onQuery.bind(this)} className="btn btn-primary mb-3">Go!</button>
                </div>
            </div>
        );
    }
}

export default CharacterQuery;