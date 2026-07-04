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


            console.log(response.data);


            alert("Registration successful");


            navigate("/login");


        } catch (error) {

            alert(
                error.response?.data?.message || 
                "Registration failed"
            );

        }

    };


    return (

        <div className="form-container">

            <h2>Register</h2>


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