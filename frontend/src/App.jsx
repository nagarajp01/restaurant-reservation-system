import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tables from "./pages/Tables";
import MyReservations from "./pages/MyReservations";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import CreateReservation from "./pages/CreateReservation";


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
          path="/tables" 
          element={<Tables />} 
        />


        <Route 
          path="/my-reservations" 
          element={<MyReservations />} 
        />


        <Route 
          path="/admin" 
          element={<AdminDashboard />} 
        />

        <Route 
          path="/reserve" 
          element={<CreateReservation />} 
        />
        <Route
        path="/my-reservations"
         element={<MyReservations />}
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;