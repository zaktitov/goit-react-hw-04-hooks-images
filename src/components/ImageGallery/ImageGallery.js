import { Component } from "react";
import s from "./ImageGallery.module.css";

const KEY = "24010057-253ecdb46e51cee64944dea92";
const URL = `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=8`;

export default class ImageGallery extends Component {
  state = {
    data: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchInfo !== this.props.searchInfo) {
      console.log("Name has been changed");

      fetch(URL)
        .then((res) => res.json())
        .then((data) => this.setState({ data }));
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ul className={s.ImageGallery}>
        {data && (
          <li className={s.GalleryItem}>
            <img className={s.ImageGalleryItemImage} src="" alt="" />
          </li>
        )}
      </ul>
    );
  }
}
