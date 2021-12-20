import "./css/App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = (props) => {
  const [purchases, setPurchases] = useState([]);
  const token = props.token;

  useEffect(() => {
    axios
      .get("/requests")
      .then((res) => {
        const p = res.data;
        setPurchases(p);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data.Error);
        }
      });

    // const p = [
    //   {
    //     name: "groceries",
    //     id: "12345",
    //     datetime: "12/12/2021",
    //     status: "delivered",
    //   },
    //   {
    //     id: "123123123",
    //     datetime: "15/12/2021",
    //     status: "pending",
    //   },
    //   {
    //     name: "snacks",
    //     id: "54321",
    //     datetime: "15/12/2021",
    //     status: "sent",
    //   },
    // ];
  }, [token]);

  return (
    <div>
      <h1>UCeta - Your purchases</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/auth";
        }}
      >
        Logout
      </button>
      <p>
        Make a new purchase{" "}
        <Link to={`/purchase/new`}>here</Link>!
      </p>
      {purchases.length ? (
        purchases.map((c, index) => {
          return (
            <div key={index}>
              <p>
                {c.request_name || "Unnamed purchase"} (Id:
                {c.Id}) - {c.date}: {c.delivery_status}
              </p>
              <Link to={`/purchase/${c.Id}`}>
                <button>Open</button>
              </Link>
            </div>
          );
        })
      ) : (
        <p className="no-classes">
          No purchases have been made so far.
        </p>
      )}
    </div>
  );
};

Homepage.defaultProps = {
  user: {},
};

export default Homepage;
