import { useEffect, useState } from "react";

const PurchaseInfo = (props) => {
  const purchase = props.purchase;
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [editName, setEditName] = useState(false);
  const [request_name, setRequestName] = useState(
    purchase.request_name
  );

  const buttons = (delivery_status) => {
    switch (delivery_status) {
      case "pending":
        return (
          <div>
            <button
              onClick={() => {
                purchase.delivery_status = "processing";
                props.onUpdate(purchase);
                setEditName(false);
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                purchase.delivery_status = "cancelled";
                props.onUpdate(purchase);
                setEditName(false);
              }}
            >
              Cancel
            </button>
          </div>
        );

      case "cancelled":
        return (
          <div>
            <p>This purchase has been cancelled.</p>
          </div>
        );

      case "processing":
        return (
          <div>
            <button
              onClick={() => {
                purchase.delivery_status = "delivered";
                props.onUpdate(purchase);
                setEditName(false);
              }}
            >
              Confirm delivery
            </button>
          </div>
        );

      case "delivered":
        return (
          <div>
            <p>This purchase has been delivered!</p>
          </div>
        );

      default:
        return (
          <div>
            <p>
              Error: unexpected status - {delivery_status}
            </p>
          </div>
        );
    }
  };

  useEffect(() => {
    if (audio) {
      audioPlaying ? audio.play() : audio.pause();
      audio.addEventListener("ended", () =>
        setAudioPlaying(false)
      );
    }
  }, [audioPlaying, audio]);

  useEffect(() => {
    setAudio(new Audio(purchase.url));
  }, [purchase.url]);

  useEffect(() => {}, [audio]);

  return (
    <div>
      {editName ? (
        <div>
          <input
            type="text"
            value={request_name}
            onChange={(e) => {
              setRequestName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              purchase.request_name = request_name;
              props.onUpdate(purchase);
            }}
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <p>
            Name: {purchase.request_name || "Not defined"}
          </p>
          <button
            onClick={() => {
              setEditName(true);
            }}
          >
            Edit
          </button>
        </div>
      )}

      <p>Creation datetime: {purchase.date}</p>
      <p>Id: {purchase.Id}</p>
      <p>Info:</p>
      <button
        onClick={() => {
          setAudioPlaying(!audioPlaying);
        }}
      >
        {audioPlaying ? "Pause" : "Play"}
      </button>
      <p>
        <b>Status:</b> {purchase.delivery_status}
      </p>
      {buttons(purchase.delivery_status)}
    </div>
  );
};

export default PurchaseInfo;
