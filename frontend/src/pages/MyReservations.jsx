import { useEffect, useState } from "react";
import api from "../services/api";


function MyReservations() {

    const [reservations, setReservations] = useState([]);


    const fetchReservations = async () => {

        try {

            const response = await api.get(
                "/reservations/my"
            );

            setReservations(response.data.data);


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchReservations();

    }, []);



    const cancelReservation = async (id) => {

        try {

            await api.patch(
                `/reservations/${id}/cancel`
            );


            alert("Reservation cancelled");


            fetchReservations();


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Cancel failed"
            );

        }

    };



    return (

    <div className="reservation-container">

        <h2>My Reservations</h2>


        <div className="reservation-list">
            {reservations.length === 0 && (
                    <h3 className="empty">
                    No reservations found
                </h3>
                    )
                }

            {
                reservations.map((reservation) => (

                    <div 
                        className="card"
                        key={reservation._id}
                    >


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


                        {
                            reservation.status === "Booked" &&

                            <button
                                onClick={() =>
                                    cancelReservation(
                                        reservation._id
                                    )
                                }
                            >
                                Cancel
                            </button>
                        }


                    </div>

                ))
            }

        </div>


    </div>

);

}


export default MyReservations;