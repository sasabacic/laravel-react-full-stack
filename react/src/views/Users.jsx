import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    //We are using useEffect to fetch the users and state changes when we delete or fetch the user
    //Whenever the state change it rerender the UI to show the latest data
    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (user) => {
        if(!window.confirm('Do you want to delete the user')){
            return;
        }

        axiosClient.delete(`/users/${user.id}`)
        .then(() => {
            getUsers();
        })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data.data);  //set the users data
        })
        .catch(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className="flex-container">
                <h1>Users</h1>
                <Link to='/users/new' className="btn-add">Create new User</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading &&
                    <tbody>
                        {users.map((user) => (
                            // eslint-disable-next-line react/jsx-key
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <Link
                                        className="btn-edit"
                                        to={"/users/" + user.id}
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                        onClick={(e) => onDelete(user)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
    );
};

export default Users;
