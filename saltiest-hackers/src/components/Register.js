import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { getRegister } from '../actions/register';


const Register = (props) => {
    // create history object so we can use it to change pages on submit
    const history = useHistory();

    // pull form methods from useForm
    const { register, handleSubmit, errors } = useForm();


    const { newUser, setNewUser } = useState({
        username: '',
        password: ''
    })

    const onChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        props.getRegister(newUser, props);
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle id='form-dialog-title'>Register</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField label='Username' 
                            variant='outlined' 
                            fullWidth={true}
                            margin='normal' 
                            autoComplete='username'
                            name='username'
                            inputRef={register({ required: true })}
                            error={errors.username ? true : false }
                            helperText={errors.username ? 'Username required' : " " }
                    />
                    <TextField label='Password' 
                            type='password' 
                            variant='outlined' 
                            fullWidth={true} 
                            margin='normal' 
                            autoComplete='new-password'
                            name='password'
                            inputRef={register({ required: true })}
                            error={errors.password ? true : false }
                            helperText={errors.password ? 'Password required' : " " }
                    />
                    <Button variant='outlined' type='submit'>Register</Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.opener(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Register;