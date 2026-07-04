import { Link } from "react-router-dom";

function Home() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home">

      <h1>Restaurant Reservation System</h1>

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


    </div>
  );

}

export default Home;