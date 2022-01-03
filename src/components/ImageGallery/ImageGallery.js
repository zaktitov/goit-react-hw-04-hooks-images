import s from "./ImageGallery.module.css";

export default function ImageGallery({ data }) {
  return (
    <ul className={s.ImageGallery}>
      {data.map((img) => (
        <li className={s.GalleryItem} key={img.id}>
          <img
            className={s.ImageGalleryItemImage}
            src={img.webformatURL}
            alt={img.tags}
          />
        </li>
      ))}
    </ul>
  );
}
