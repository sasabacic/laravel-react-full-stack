import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
    const { user } = useStateContext();

    return (
        <div>
            {user?.role === "admin" ? (
                <h1>Welcome Admin!</h1>
            ) : (
                <h1>Access Denied</h1>
            )}
        </div>
    );
};

export default Dashboard;