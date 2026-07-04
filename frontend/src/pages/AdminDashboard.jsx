import { useEffect, useState } from "react";
import api from "../services/api";


function AdminDashboard() {

    const [reservations, setReservations] = useState([]);

    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
    status: "" 
    });


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



    const fetchByDate = async (date) => {

        try {

            const response = await api.get(
                `/reservations/by-date?date=${date}`
            );

            setReservations(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };



    const cancelReservation = async (id) => {

        try {

            await api.patch(
                `/reservations/${id}`,
                {
                    status: "Cancelled"
                }
            );


            fetchAllReservations();


        } catch (error) {

            console.log(error);

        }

    };



    const deleteReservation = async (id) => {

        try {

            await api.delete(
                `/reservations/${id}`
            );


            fetchAllReservations();


        } catch (error) {

            console.log(error);

        }

    };

    const handleEdit = (reservation) => {

    setEditId(reservation._id);

    setFormData({

        reservationDate:
        reservation.reservationDate.slice(0,10),

        reservationTime:
        reservation.reservationTime,

        numberOfGuests:
        reservation.numberOfGuests,

        status:
        reservation.status

    });

};

const updateReservation = async () => {

    try {

        await api.patch(
            `/reservations/${editId}`,
            formData
        );


        setEditId(null);

        fetchAllReservations();


    } catch(error){

        console.log(error);

    }

};



    return (

    <div className="reservation-container">


        <h2>Admin Dashboard</h2>


       <div className="filter-box">

            <input
                    type="date"
                     onChange={(e) =>
                 fetchByDate(e.target.value)
             }/>


                <button
                     onClick={fetchAllReservations}>
                     Show All
                </button>

            </div>



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
                            {
                            reservation.reservationDate
                            .slice(0,10)
                            }
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
                            editId === reservation._id && (

                                <div>

                                    <input
                                        type="date"
                                        value={formData.reservationDate}
                                        onChange={(e)=>
                                            setFormData({
                                                ...formData,
                                                reservationDate:e.target.value
                                            })
                                        }
                                    />


                        <select
                            value={formData.reservationTime}
                                     onChange={(e)=>
                                    setFormData({
                                    ...formData,
                                reservationTime:e.target.value
                                                })
                                                }>

                        <option value="12:00">12:00</option>
                         <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>

                        </select>


                                    <input
                                        type="number"
                                        value={formData.numberOfGuests}
                                        onChange={(e)=>
                                            setFormData({
                                                ...formData,
                                                numberOfGuests:e.target.value
                                            })
                                        }
                                    />


                                    <select
                                        value={formData.status}
                                        onChange={(e)=>
                                            setFormData({
                                                ...formData,
                                                status:e.target.value
                                            })
                                        }
                                    >

                                        <option>Booked</option>
                                        <option>Cancelled</option>

                                    </select>


                                    <button
                                        onClick={updateReservation}
                                    >
                                        Save
                                    </button>

                                </div>

                            )
                        }



                        <div className="card-buttons">


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


                            <button
                                onClick={() =>
                                    handleEdit(reservation)
                                }
                            >
                                Edit
                            </button>



                            <button
                                onClick={() =>
                                    deleteReservation(
                                        reservation._id
                                    )
                                }
                            >
                                Delete
                            </button>


                        </div>


                    </div>

                ))
            }


        </div>


    </div>

);

}


export default AdminDashboard;