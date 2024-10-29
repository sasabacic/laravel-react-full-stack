import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 10,
        total: 0,
        next_page_url: null,
        prev_page_url: null,
    });

    //We are using useEffect to fetch the users and state changes when we delete or fetch the user
    //Whenever the state change it rerender the UI to show the latest data
    useEffect(() => {
        getUsers(pagination.current_page, search);
    }, [pagination.current_page, search]);

    const onDelete = (user) => {
        if (!window.confirm("Do you want to delete the user")) {
            return;
        }

        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification("User was successfuly deleted");
            getUsers();
        });
    };

    const getUsers = (page = 1, searchTerm = "") => {
        setLoading(true);
        axiosClient
            .get(`/users/?page=${page}&search=${searchTerm}`)
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
                setPagination({
                    current_page: data.meta.current_page,
                    last_page: data.meta.last_page,
                    from: data.meta.from,
                    to: data.meta.to,
                    next_page_url: data.links.next,
                    prev_page_url: data.links.prev,
                });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (url) => {
        if (url) {
            const page = new URL(url).searchParams.get("page");
            /*we are passing first the current state as the first argument to the callback
            and then we are copying all previous state properties and only update the current page */
            setPagination((prev) => ({
                ...prev,
                current_page: parseInt(page),
            }));
        }
    };

    // Handling search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setPagination((prev) => ({...prev, current_page: 1}))
    }

    return (
        <div>
            <div className="flex-container">
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Create new User
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <input type="text" placeholder="Search Users" value={search} onChange={handleSearchChange}/>
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

                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => (

                                <tr key={user.id}>
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
                        </tbody>
                    )}
                </table>

                {/* Pagination Info */}
                <div className="pagination-info">
                    <p>
                        Showing {pagination.from} to {pagination.to} of{" "}
                        {pagination.total} users.
                    </p>
                </div>

                <div className="pagination-buttons">
                    <button
                        disabled={!pagination.prev_page_url}
                        onClick={() =>
                            handlePageChange(pagination.prev_page_url)
                        }
                    >
                        Previous
                    </button>
                    <span>
                        Page {pagination.current_page} of {pagination.last_page}
                    </span>
                    <button
                        disabled={!pagination.next_page_url}
                        onClick={() =>
                            handlePageChange(pagination.next_page_url)
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
