import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [reservations, setReservations] = useState([]);

    const fetchAllReservations = async () => {

        try {

            const response = await api.get(
                "/reservations/admin"
            );

            setReservations(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchAllReservations();

    }, []);


   return (

    <div className="reservation-container">

        <h2>Admin Dashboard</h2>


        <div className="reservation-list">

            {
                reservations.map((reservation) => (

                    <div
                        className="card"
                        key={reservation._id}
                    >

                        <p>
                            Customer:
                            {reservation.customer?.fullName}
                        </p>


                        <p>
                            Date:
                            {reservation.reservationDate.slice(0,10)}
                        </p>


                        <p>
                            Time:
                            {reservation.reservationTime}
                        </p>


                        <p>
                            Guests:
                            {reservation.numberOfGuests}
                        </p>


                        <p>
                            Status:
                            {reservation.status}
                        </p>


                    </div>

                ))
            }

        </div>


    </div>

);
}


export default AdminDashboard;