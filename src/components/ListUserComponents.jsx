import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponents extends Component {

    constructor(props){
        super(props)

        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    addUser(){
        this.props.history.push('/add-user');
    }

    editUser(id){
        this.props.history.push(`/update-user/${id}`);
    }

    deleteUser(id){
        UserService.deleteUser(id).then(res => {
            this.setState({ users: this.state.users.filter(user => user.id !== id) });
        }).catch(error => {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        });
    }

    viewUser(id){
        this.props.history.push(`/view-user/${id}`);
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        }).catch(error => {
            console.error("Error fetching users:", error);
            alert("Failed to retrieve users");
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> User List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User </button>
                </div>
                <br />

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => this.editUser(user.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponents;
