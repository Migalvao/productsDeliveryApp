import { Link } from "react-router-dom";

const NotFound = (props) => {
  console.log(props.error);
  return (
    <div>
      <h1>UCeta - Error</h1>
      <p>
        Internal server error ocurred. Check console for
        more details.
      </p>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default NotFound;
