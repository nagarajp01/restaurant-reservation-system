import { useEffect, useState } from "react";
import api from "../services/api";

function CreateReservation() {

    const [tables, setTables] = useState([]);

    const [formData, setFormData] = useState({
        tableId: "",
        reservationDate: "",
        reservationTime: "",
        numberOfGuests: ""
    });


    const timeSlots = [
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00"
    ];


    useEffect(() => {

        const fetchTables = async () => {

            const response = await api.get("/tables");

            setTables(response.data.data);

        };

        fetchTables();

    }, []);



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/reservations",
                formData
            );

            alert("Reservation booked successfully");


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Booking failed"
            );

        }

    };



    return (

        <div>

            <h2>Create Reservation</h2>


            <form onSubmit={handleSubmit}>


                <select
                    name="tableId"
                    onChange={handleChange}
                >

                    <option>Select Table</option>

                    {
                        tables.map((table) => (

                            <option
                                key={table._id}
                                value={table._id}
                            >
                                Table {table.tableNumber}
                                -
                                Capacity {table.capacity}

                            </option>

                        ))
                    }

                </select>



                <input
                    type="date"
                    name="reservationDate"
                    onChange={handleChange}
                />



                <select
                    name="reservationTime"
                    onChange={handleChange}
                >

                    <option>Select Time Slot</option>


                    {
                        timeSlots.map((slot) => (

                            <option
                                key={slot}
                                value={slot}
                            >
                                {slot}
                            </option>

                        ))
                    }

                </select>



                <input
                    type="number"
                    name="numberOfGuests"
                    placeholder="Guests"
                    onChange={handleChange}
                />



                <button>
                    Book Table
                </button>


            </form>


        </div>

    );

}


export default CreateReservation;