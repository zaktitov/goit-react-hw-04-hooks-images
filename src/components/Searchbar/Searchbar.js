import React, { Component } from "react";
import s from "./Searchbar.module.css";
import { BiSearchAlt } from "react-icons/bi";
import { IconContext } from "react-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SearchBar extends Component {
  state = { searchInfo: "" };

  handleNameChange = (event) => {
    this.setState({ searchInfo: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchInfo.trim() === "") {
      return toast.error("Enter the text!");
    }
    this.props.onSubmit(this.state.searchInfo);
    console.log(this.state.searchInfo);
    this.setState({ searchInfo: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <IconContext.Provider value={{ color: "blue" }}>
              <BiSearchAlt />
            </IconContext.Provider>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInfo}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
