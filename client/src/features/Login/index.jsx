import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import './Login.scss';
import { useForm } from 'react-hook-form';

import userApi from 'api/useAPI'

import { useDispatch } from 'react-redux';
import { addToUser } from './authSlice';


Login.propTypes = {};

function Login(props) {

    const { handleSubmit, register, errors } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        "email": '',
        "password": ''
    })

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const onSubmit = async () => {
        try {
            const token = await userApi.login({ ...user })
            const inforUser = await userApi.getUser()
            dispatch(addToUser(inforUser));
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem('firstLogin', true)
            history.push('/admin')
        } catch (err) {
            alert(err.response.data.msg)
        }

    }
    useEffect(() => {
        const islogin = localStorage.getItem('firstLogin');
        if (islogin == "true") {
            history.push('/admin')
        }

    }, [])
    return (
        <body>
            <div className="Login">
                <div className=" w3l-login-form">
                    <h2>Login Admin</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" w3l-form-group">
                            <label style={{ color: "black" }}>Email:</label>
                            <div className="group">
                                <i className="fas fa-user" />
                                <input name="email" type="email" onChange={onChangeInput} className="form-control" placeholder="Email" required="required" ref={register({
                                    validate: value => value !== "admin" || "Nice try!"
                                })} />
                            </div>
                        </div>
                        <div className=" w3l-form-group">
                            <label style={{ color: "black" }}>Password:</label>
                            <div className="group">
                                <i className="fas fa-unlock" />
                                <input name="password" type="password" onChange={onChangeInput} className="form-control" placeholder="Password" required="required"
                                    ref={register({
                                        validate: value => value !== "admin" || "Nice try!"
                                    })}
                                />
                            </div>
                        </div>
                        <button className="btnSubmit" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Login;