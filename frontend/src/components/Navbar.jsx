import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import api from "../services/api";
import { logout } from "../features/auth/authSlice";


function Navbar() {

    const { user, status } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();


    const handleLogout = async () => {

        try {

            await api.post("/users/logout");
            localStorage.removeItem("user");

            dispatch(logout());

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <nav className="navbar">

            <h2>Restaurant</h2>


            <div>

                <Link to="/">Home</Link>


                {
                    status && (
                        <>
                            <Link to="/manage-tables">
                                    Manage Tables
                            </Link>


                            <Link to="/my-reservations">
                                My Reservations
                            </Link>
                        </>
                    )
                }


                {
                    user?.role === "admin" && (
                        <Link to="/admin">
                            Admin
                        </Link>
                    )
                }


                {
                    status ? (

                        <button onClick={handleLogout}>
                            Logout
                        </button>

                    ) : (

                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>

                    )
                }

            </div>

        </nav>

    );

}


export default Navbar;