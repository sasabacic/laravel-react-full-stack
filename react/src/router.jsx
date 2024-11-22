import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import TrainingForm from "./views/TrainingForm";
import TrainingsList from "./views/TrainingsList";

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout />,
        children: [

            {
                path: '/',
                element: <Navigate to='/users' />
            },

            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },

            {
                path: '/users/new',
                element: <UserForm key="createUser" />
            },

            {
                path: '/trainings/new',
                element: <TrainingForm key="createTraining" />
            },

            {
                path: '/edit-training/:id',
                element: <TrainingForm key="editTraining" />
            },

            {
                path: '/trainings/',
                element: <TrainingsList key="listTraining" />
            },



            {
                path: '/users/:id',
                element: <UserForm key="updateUser" />
            },

        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },

    {
        path: "*",
        element: <NotFound />,

    },
        ])

export default router;
