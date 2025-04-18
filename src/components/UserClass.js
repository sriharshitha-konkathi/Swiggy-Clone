import react from "react";

class UserClass extends react.Component {
  constructor(props) {
    super(props);

    // console.log("child constructor");
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
  }

  async componentDidMount() {
    // console.log("child componentDidMount");
    const data = await fetch(
      "https://api.github.com/users/sriharshitha-konkathi"
    );
    const json = await data.json();
    this.setState({
      userInfo: json,
    });

    console.log(json);
  }

  render() {
    // console.log("child Render");

    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name:{name}</h2>
        <h3> Location:{location}</h3>
        <h4>Contact:9875436786</h4>
      </div>
    );
  }
}

export default UserClass;
