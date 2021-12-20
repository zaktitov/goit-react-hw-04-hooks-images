import { Component } from "react/cjs/react.production.min";
import { ToastContainer } from "react-toastify";
import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import "./App.css";
class App extends Component {
  state = { searchInfo: "" };

  // componentDidMount() {}

  handleSubmitForm = (searchInfo) => {
    this.setState({ searchInfo });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmitForm} />
        <ImageGallery searchInfo={this.state.searchInfo} children />
        <ToastContainer autoClose={2000} position="top-right" />
      </div>
    );
  }
}

export default App;
