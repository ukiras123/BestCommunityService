import React from "react";
import { Link } from "react-router-dom";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Page Not Found</h1>
        <Link to="/">Go to Homepage</Link>
      </div>
    );
  }
}

export { ErrorPage };
