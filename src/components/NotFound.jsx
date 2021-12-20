import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>UCeta - Error</h1>
      <p>Purchase not found! Why not go back?</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default NotFound;
