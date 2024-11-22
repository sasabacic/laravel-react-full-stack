import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';



const TrainingForm = () => {
    const navigate = useNavigate();
    const {state: trainingData} = useLocation();
    const {setNotification} = useStateContext();

    const [form, setForm] = useState({
        activity_type: '',
        pace: '',
        distance: '',
        duration: '',
        notes: ''
    });

    useEffect(() => {
        if (trainingData){
            setForm(trainingData)
        }
    }, [trainingData])

    //We are calling this function when the form input changes(when the user types in an input field)
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (trainingData) {
            // Update existing training
            axiosClient.put(`/trainings/${trainingData.id}`, form)
                .then(() => {
                    setNotification('Training updated successfully');
                    navigate('/trainings');
                })
                .catch(() => {
                    setNotification('Error updating training');
                });
        } else {
            // Create new training
            axiosClient.post('/trainings', form)
                .then(() => {
                    setNotification('Training added successfully');
                    navigate('/trainings'); // Redirect back to trainings list
                })
                .catch(() => {
                    setNotification('Error adding training');
                });
        }
    };




  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="activity_type">Activity type</label>
                <br /> 
                <select
                id="activity_type"
                name="activity_type"
                value={form.activity_type}
                onChange={handleChange}
                required
                >

                    <option value="swim">Swim</option>
                    <option value="bike">Bike</option>
                    <option value="run">Run</option>
                </select>
                <br></br>
                <br/>
            </div>

            <div>
                <label htmlFor="pace">Pace</label>
                <input type="text"
                id="pace"
                name="pace"
                value={form.pace}
                onChange={handleChange}
                required />
            </div>
            <div>
                <label htmlFor="distance">Distance</label>
                <input type="number"
                id="distance"
                name="distance"
                value={form.distance}
                onChange={handleChange}
                required />
            </div>
            <div>
                <label htmlFor="duration">Duration</label>
                <input type="number"
                id="duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required/>
            </div>
            <div>
            <label htmlFor="notes">Notes</label>
                <br></br>
                <textarea
                name="notes"
                id="notes"
                value={form.notes}
                onChange={handleChange}>
                </textarea>
            </div>

            <button className='btn-add' type="submit">
                {trainingData ? 'Update' : 'Submit'}
            </button>

        </form>

    </div>
  )
}

export default TrainingForm