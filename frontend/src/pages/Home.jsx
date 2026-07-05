import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Home() {

  // const user = JSON.parse(localStorage.getItem("user"));
const {user}=useSelector((state)=>state.auth)

  return (

    <div className="home">


      {
        user?.role === "admin" ? (

          <>

            <h1>
              Admin Control Panel
            </h1>


            <p>
              Manage reservations, Tables availability, and View bookings.
            </p>


            <div className="admin-actions">

              <Link to="/admin">
              <button>
                Manage Reservations
              </button>
            </Link>


            <Link to="/manage-tables">
              <button>
                Manage Tables
              </button>
            </Link>



            </div>


          </>

        ) : (

          <>

            <h1>
              Restaurant Reservation System
            </h1>


            <p>
              Book your table easily and manage reservations online
            </p>


            {
              user ? (

                <Link to="/reserve">
                  <button>
                    Book a Table
                  </button>
                </Link>

              ) : (

                <Link to="/login">
                  <button>
                    Get Started
                  </button>
                </Link>

              )
            }


          </>

        )
      }


    </div>

  );

}


export default Home;