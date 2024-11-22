import React, {useEffect, useState} from 'react'
import axiosClient from "../axios-client"
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const TrainingsList = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setNotification} = useStateContext();
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        axiosClient.get('trainings')
        .then(response => {
            setLoading(false);
            setTrainings(response.data)
        })
        .catch((error) => {
            console.log('Error fetching trainings',error)
        })
    }, []);

    const deleteTraining = (id) => {
        setLoading(true)
        axiosClient.delete(`/trainings/${id}`)
        .then(() => {
            setLoading(false);
            setTrainings(trainings.filter(training => training.id !== id));
            setNotification('Training was deleted successfully')

        })
        .catch(() => {
            setNotification('Error in deleting training');
        })
    }

    const editTraining = (training) => {
        navigate(`/edit-training/${training.id}`, { state: training });
    };



  return (
    <div>
        {loading ? ( // Show loading while loading
                <p>Loading...</p>
            ) : (

                <div>

        {trainings.length > 0 ? (
            trainings.map((training) => (
                <div key={training.id}>
                    <h3>{training.activity_type.toUpperCase()}</h3>
                    <p>Pace: {training.pace}</p>
                    <p>Distance: {training.distance}</p>
                    <p>Duration: {training.duration}</p>
                    <p>Notes: {training.notes}</p>
                    <button onClick={() => deleteTraining(training.id)} className='btn-delete'>Delete</button>
                    <button onClick={() => editTraining(training)} className='btn-add'>Edit</button>


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

export default TrainingsList