import React, { Component } from 'react';
import UserService from '../services/UserService'; // Assuming you have a service to interact with backend

class CreateUserComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '', 
            email: ''
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, email: this.state.email};
        console.log('user => ' + JSON.stringify(user));

        // Call the service to create the user and then navigate back to the list of users
        UserService.createUser(user).then(res => {
            this.props.history.push('/users'); // Navigates to the user list page
        }).catch(error => {
            console.error("Error saving user:", error);
        });
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Add User Information</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Name: </label>
                                        <input
                                            placeholder="Name"
                                            name="name"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.changeNameHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Email Address: </label>
                                        <input
                                            placeholder="Email Address"
                                            name="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.changeEmailHandler}
                                        />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserComponent;
