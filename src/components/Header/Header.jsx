import { Component } from "react";
import "../../scss/modules/_header.scss";
import logo from "../../images/youtube-logo.png";
import { GetData } from "../../api/api";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: "",
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  onSubmitForm(e) {
    e.preventDefault();

    GetData(this.input.value)
      .then((json) => {

        this.setState({
          data: [...json.items],

        })
        this.props.PassData(this.state.data)

      })

    this.setState({ input: "" });
  }

  render() {
    return (
      <header>
        <form onSubmit={this.onSubmitForm}>
          <div className="wrapper">
            <img src={logo} alt="something" />
            <section className="search">
              <input
                onChange={this.handleChange}
                ref={(myinput) => (this.input = myinput)}
                value={this.state.input}
              />
              <button>Search</button>
            </section>
          </div>
        </form>
      </header>
    );
  }
}

export default Header;
