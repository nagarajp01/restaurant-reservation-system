import { useEffect, useState } from "react";
import api from "../services/api";

function ManageTables(){

    const [tables,setTables] = useState([]);

    const [tableNumber,setTableNumber] = useState("");
    const [capacity,setCapacity] = useState("");

    const getTables = async()=>{

        const res = await api.get("/tables");

        setTables(res.data.data);
    };

    const createTable = async () => {

    try{

        await api.post(
            "/tables",
            {
                tableNumber,
                capacity
            }
        );


        alert("Table created");

        setTableNumber("");
        setCapacity("");

        getTables();

    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Create failed"
        );

    }

};

const deleteTable = async(id)=>{

    try{

        await api.delete(
            `/tables/${id}`
        );


        alert("Table deleted");


        getTables();

    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Delete failed"
        );

    }

};

        const updateTable = async(id)=>{

    const newCapacity = prompt("Enter new capacity");


    if(!newCapacity){
        return;
    }


    try{

        await api.patch(
            `/tables/${id}`,
            {
                capacity:newCapacity
            }
        );


        alert("Table updated");


        getTables();

    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Update failed"
        );

    }

};


    useEffect(()=>{

        getTables();

    },[]);


    return(

        <div className="reservation-container">

            <h2>Manage Tables</h2>

                     <div className="card">

                         <input
                         type="number"
                         placeholder="Table number"
                         value={tableNumber}
                         onChange={(e)=>setTableNumber(e.target.value)}
                        />


                         <input
                         type="number"
                         placeholder="Capacity"
                         value={capacity}
                        onChange={(e)=>setCapacity(e.target.value)}
                            />


                <button onClick={createTable}>
                     Add Table
                </button>


                </div>


            <div className="reservation-list">

            {
                tables.map((table)=>(

                    <div 
                      className="card"
                      key={table._id}
                    >

                      <p>
                        Table No:
                        {table.tableNumber}
                      </p>

                      <p>
                        Capacity:
                        {table.capacity}
                      </p>

                      <div className="button-group">

                        <button onClick={() => deleteTable(table._id)}>
                            Delete
                        </button>

                        <button onClick={() =>updateTable(table._id)}>
                                Update
                        </button>
                      </div>


                    </div>

                ))
            }

            </div>

        </div>
    )

}

export default ManageTables;