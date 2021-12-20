import "./css/App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewRequest = (props) => {
  const [purchaseText, setPurchaseText] = useState("");
  const [purchase, setPurchase] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [request_name, setRequestName] = useState("");
  const [loading, setLoading] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const token = props.token;

  const checkPurchase = () => {
    if (!purchaseText) return;
    //Request new purchase

    const formData = new FormData();
    formData.append("text", purchaseText);
    formData.append("request_name", request_name);
    formData.append("token", token);

    setLoading(true);
    setReadOnly(true);

    axios
      .post("/request", formData)
      .then((res) => {
        const p = res.data;
        setPurchase(p);
        setAudio(new Audio(p.url));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data.Error);
        }
        setLoading(false);
      });
  };

  const updatePurchase = (newStatus) => {
    setLoading(true);
    const p = purchase;
    p.delivery_status = newStatus;
    p.token = props.token;

    axios
      .put("/request", p)
      .then((res) => {
        const p = res.data;
        setPurchase(p);
        setLoading(false);

        if (newStatus === "cancelled")
          window.location.href = "/";
        else
          window.location.href = `/purchase/${purchase.Id}`;
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          console.log(error.response.data.Error);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () =>
        setAudioPlaying(false)
      );
      audioPlaying ? audio.play() : audio.pause();
    }
  }, [audioPlaying, audio]);

  return (
    <div>
      <h1>UCeta - New Purchase</h1>
      <p>Enter your request:</p>
      <textarea
        value={purchaseText}
        readOnly={readOnly}
        onChange={(e) => {
          setPurchaseText(e.target.value);
        }}
      />
      <p>Enter a name for your request (optional):</p>
      <input
        type="text"
        value={request_name}
        readOnly={readOnly}
        onChange={(e) => {
          setRequestName(e.target.value);
        }}
      />
      <br />
      <br />
      {loading ? (
        <p>Waiting...</p>
      ) : readOnly ? null : (
        <button onClick={checkPurchase}>Request</button>
      )}
      <br />
      {audio && !loading ? (
        <div>
          <button
            onClick={() => {
              setAudioPlaying(!audioPlaying);
            }}
          >
            {audioPlaying ? "Pause" : "Play"}
          </button>
          <br />
          <br />
          <button
            onClick={() => {
              updatePurchase("processing");
            }}
          >
            Confirm
          </button>
          {"\t"}
          <button
            onClick={() => {
              updatePurchase("cancelled");
            }}
          >
            Cancel
          </button>
        </div>
      ) : null}
      <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default NewRequest;
