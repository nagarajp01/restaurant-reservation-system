import { BrowserRouter, Routes, Route } from "react-router-dom";
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


      </Routes>

    </BrowserRouter>

  );

}


export default App;