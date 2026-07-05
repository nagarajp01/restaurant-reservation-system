import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
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
                "/users/register",
                formData
            );




           setMessage("Registration successful");
            setError("");


            navigate("/login");


        } catch (error) {

            setError(error.response?.data?.message ||"Registration failed");
            setMessage("");

        }

    };


    return (

        <div className="form-container">

            <h2>Register</h2>
            {message && (
            <p className="message">
        {message}
             </p>)}

            {error && (
             <p className="error">
                {error}
             </p>)}

            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                />


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


                <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                />


                <button type="submit">
                    Register
                </button>


            </form>


        </div>

    );

}


export default Register;