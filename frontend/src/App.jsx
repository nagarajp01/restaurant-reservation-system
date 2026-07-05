import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./services/api";
import { setUser, logout } from "./features/auth/authSlice";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManageTables from "./pages/ManageTables";
import MyReservations from "./pages/MyReservations";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import CreateReservation from "./pages/CreateReservation";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";




function App() {
   const dispatch = useDispatch();

    useEffect(() => {

    const checkUser = async () => {

      try {

        const response = await api.get("/users/current-user");

        dispatch(setUser(response.data.data));

      } catch (error) {

        dispatch(logout());

      }

    };

    checkUser();

  }, []);


  return (

    <BrowserRouter>
    <Navbar />

      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />


        <Route 
          path="/login" 
          element={<Login />} 
        />


        <Route 
        path="/manage-tables"
        element={
          <AdminRoute>
            <ManageTables />
          </AdminRoute>
        }
      />


        <Route 
          path="/my-reservations" 
          element={
            <ProtectedRoute role="customer">
              <MyReservations />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />

        <Route 
          path="/reserve" 
          element={
            <ProtectedRoute>
              <CreateReservation />
            </ProtectedRoute>
          
        } 
        />
        <Route path="*" element={<Navigate to="/" />} />


      </Routes>

    </BrowserRouter>

  );

}


export default App;