import "./css/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PurchaseInfo from "./components/PurchaseInfo";
import NotFound from "./components/NotFound";
import { Link } from "react-router-dom";
import axios from "axios";

const Purchase = (props) => {
  const [purchase, setPurchase] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { purchaseId } = useParams();

  const updatePurchase = (updated) => {
    updated.token = props.token;
    setPurchase(null);

    axios
      .put("/request", updated)
      .then((res) => {
        const p = res.data;
        setPurchase(p);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data.Error);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`/requestInfo/${purchaseId}`)
      .then((res) => {
        const p = res.data;
        setPurchase(p);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data.Error);
        }
        setNotFound(true);
      });
  }, [purchaseId]);

  if (notFound) return <NotFound></NotFound>;

  return (
    <div>
      <h1>UCeta - Purchase</h1>
      {purchase ? (
        <div>
          <PurchaseInfo
            purchase={purchase}
            onUpdate={updatePurchase}
          ></PurchaseInfo>
          <br />
          <Link to={"/"}>Home</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Purchase;
