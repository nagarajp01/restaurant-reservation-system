import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { login } from "../features/auth/authSlice";


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await api.post(
                "/users/login",
                formData
            );

            localStorage.setItem(
                        "user",
                JSON.stringify(response.data.data.user)
            );


            console.log(response.data);


            dispatch(
                login(response.data.data.user)
            );


            setMessage("Registration successful");
            setError("");


            navigate("/");


        } catch (error) {

            setError(error.response?.data?.message ||"Registration failed");
            setMessage("");

        }

    };


    return (

        <div className="form-container">

            <h2>Login</h2>
            {message && (<p className="message">  {message}</p>)}

            {error && (<p className="error"> {error}</p>)}


            <form onSubmit={handleSubmit}>


                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />


                <button type="submit">
                    Login
                </button>


            </form>

        </div>

    );

}


export default Login;