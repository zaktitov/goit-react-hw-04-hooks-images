import { Component } from "react/cjs/react.production.min";
import { ToastContainer } from "react-toastify";
import SearchBar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { animateScroll as scroll } from "react-scroll";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import api from "./services/api";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [searchInfo, setInfo] = useState("");
  const [showModal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [currImg, setImage] = useState({});

  // state = {
  //   searchInfo: "",
  //   showModal: false,
  //   data: [],
  //   error: null,
  //   status: "idle",
  //   page: 1,
  //   currImg: {},
  // };

  useEffect(() => {
    if (searchInfo) {
      setStatus("pending");
      setPage(1);
      setData([]);

      api
        .fetchPhotos(searchInfo, page)
        .then((data) => data.hits)
        .then((data) => {
          setData((prevState) => [...prevState, ...data]);
          setStatus("resolved");
        })
        .catch(setStatus("rejected"));

      scroll.scrollToBottom();
    }
  }, [searchInfo]);

  useEffect(() => {
    if (searchInfo && page !== 1) {
      setStatus("pending");

      api
        .fetchPhotos(searchInfo, page)
        .then((data) => data.hits)
        .then((data) => {
          setData((prevState) => [...prevState, ...data]);
          setStatus("resolved");
        })
        .catch(setStatus("rejected"));

      scroll.scrollToBottom();
    }
  }, [page]);

  const handleSubmitForm = (searchInfo) => {
    setInfo(searchInfo);
  };

  const toggleModal = (image) => {
    setModal(!showModal);
    setImage(image);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmitForm} />

      {status === "idle" && <div>Enter the Text</div>}

      {status === "pending" && (
        <div>
          <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
        </div>
      )}

      {status === "resolved" && (
        <div>
          <ImageGallery data={data} onOpenModal={toggleModal} />
          {data.length !== 0 && (
            <Button onLoadMore={() => setPage((prevState) => prevState + 1)} />
          )}
          <ToastContainer autoClose={2000} position="top-right" />
        </div>
      )}

      {status === "rejected" && (
        <div>
          <ImageGallery data={data} />
        </div>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={currImg.largeImageURL} alt={currImg.tags} />
        </Modal>
      )}
    </div>
  );
}
