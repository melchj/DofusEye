import React from 'react'


const Alias = ({onChangeForm}) => {

    return (
        <div className="container">
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="firstname" id="firstname" aria-describedby="emailHelp" placeholder="First Name" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="exampleInputPassword1">Last Name</label>
                    <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="lastname" id="lastname" placeholder="Last Name" />
                </div>
            </div>
        </div>
    )
}

export default Alias
