import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom"
import { Container, Typography } from '@mui/material';
import { height } from '@mui/system';
import useDataProvider from '../Context/useDataProvider';

const styles = {
    input: {
        display: 'block',
    }
}

const TaskManager = () => {
    const [taskList, setTaskList] = useDataProvider();
    const { pathname } = useLocation();
    // console.log(pathname);
    let navigate = useNavigate();
    const navigateRoute = () => {
        navigate('/');
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const newTask = {
            id: taskList.length + 1,
            ...data,
        }
        const updatedTaskList = [...taskList, newTask];
        setTaskList(updatedTaskList);
        navigate('/');
    }

    // console.log(watch("example"));

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            {
                pathname === '/addtask' &&

                <>
                    <Typography variant='h2'>
                        Add Task
                    </Typography>
                    <form form onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder='Task' {...register("pendingTask", { required: true })} />
                        <br />
                        <input type='date' {...register("dueDate", { required: true })} />
                        <br />

                        <input type="submit" />
                        <br />
                        {(errors.pendingTask || errors.dueDate) && <span>This field is required</span>}
                    </form>
                </>


            }

        </ Container>
    );
};

export default TaskManager;