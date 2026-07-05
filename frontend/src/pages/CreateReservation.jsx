import { useEffect, useState } from "react";
import api from "../services/api";

function CreateReservation() {
    const [message, setMessage] = useState("");
    const [tables, setTables] = useState([]);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        tableId: "",
        reservationDate: "",
        reservationTime: "",
        numberOfGuests: ""
    });

//     const today = new Date().toISOString().split("T")[0];

// const currentHour = new Date().getHours();


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

            // alert("Reservation booked successfully");
            setMessage("Reservation created successfully");
            setError("");


        } catch (error) {

             setError(
        error.response?.data?.message ||
        "Something went wrong"
    );
        setMessage("")
        }

    };



    return (

        <div>

            <h2>Create Reservation</h2>

            {message && <p className="message">{message}</p>}
            {error && (<p className="error">{error}</p>)}
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
                 min={new Date().toISOString().split("T")[0]}
                 onChange={handleChange}/>



                <select
                    name="reservationTime"
                    onChange={handleChange}
                >

                    <option>Select Time Slot</option>


                    {
timeSlots.map((slot) => {

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const currentHour =
        new Date().getHours();

    const slotHour =
        Number(slot.split(":")[0]);

    const isDisabled =
        formData.reservationDate === today &&
        slotHour <= currentHour;


    return (

        <option
            key={slot}
            value={slot}
            disabled={isDisabled}
        >
            {slot}
        </option>

    );

})
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