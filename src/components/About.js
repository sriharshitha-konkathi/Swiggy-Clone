import User from "./User";
import React from "react";
import UserClass from "./UserClass.js";
import UserContext from "../utils/userContext.js";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  // console.log("parent constructor");

  componentDidMount() {
    // console.log("parent componentDidMount");
  }

  render() {
    //console.log("parent render");

    return (
      <div>
        <h1>About</h1>
        <div>
          loggedInUser
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="text-lg font-bold">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>
        </div>
        <h1>This is about the RESTATURANTS</h1>
        <UserClass name={"first"} location={"hyd"} />
      </div>
    );
  }
}
export default About;
