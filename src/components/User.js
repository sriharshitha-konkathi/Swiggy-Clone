import react, { useState } from "react";

const User = ({ name }) => {
  const [count] = useState(0);
  return (
    <div className="user-card">
      <h1>Count={count}</h1>
      <h2>Name: {name}</h2>
      <h3> Location: Hyderabad</h3>
      <h4>Contact:9875436786</h4>
    </div>
  );
};

export default User;
