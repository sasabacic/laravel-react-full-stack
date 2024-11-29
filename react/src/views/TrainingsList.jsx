import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Spinner from "./Spinner";

const TrainingsList = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const { setNotification } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("trainings")
            .then((response) => {
                setLoading(false);
                setTrainings(response.data);
            })
            .catch((error) => {
                console.log("Error fetching trainings", error);
            });
    }, []);

    const deleteTraining = (id) => {
        setLoading(true);
        axiosClient
            .delete(`/trainings/${id}`)
            .then(() => {
                setLoading(false);
                setTrainings(
                    trainings.filter((training) => training.id !== id)
                );
                setNotification("Training was deleted successfully");
            })
            .catch(() => {
                setNotification("Error in deleting training");
            });
    };

    const editTraining = (training) => {
        navigate(`/edit-training/${training.id}`, { state: training });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()

    }

    const filteredTrainings = filter
    ? trainings.filter((training) => training.activity_type === filter)
    : trainings; // Apply filter

    return (
        <div>
            <div>
                <label htmlFor="activity_filter">Filter the activity by type:</label>
                <br />
                <select
                id="activity_filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All activity</option>
                    <option value="swim">Swim</option>
                    <option value="bike">Bike</option>
                    <option value="run">Run</option>
                </select>
            </div>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <div>
                    {filteredTrainings.length > 0 ? (
                        filteredTrainings.map((training) => (
                            <div key={training.id}>
                                <h3>{training.activity_type.toUpperCase()}</h3>
                                <p>Date: {formatDate(training.training_date)}</p>
                                <p>Pace: {training.pace}</p>
                                <p>Distance: {training.distance}</p>
                                <p>Duration: {training.duration}</p>
                                <p>Notes: {training.notes}</p>
                                <button
                                    onClick={() => deleteTraining(training.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => editTraining(training)}
                                    className="btn-add"
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No trainings available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrainingsList;
