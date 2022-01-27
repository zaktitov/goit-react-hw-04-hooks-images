import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = ({ code }) => {
    code === "Escape" && onClose();
  };

  const handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && onClose();
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    document.querySelector("#modal-root")
  );
}
// import { Component } from "react";
// import { createPortal } from "react-dom";
// import s from "./Modal.module.css";

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (event) => {
//     event.code === "Escape" && this.props.onClose();
//   };

//   handleOverlayClick = (event) => {
//     event.currentTarget === event.target && this.props.onClose();
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleOverlayClick}>
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>,
//       document.querySelector("#modal-root")
//     );
//   }
// }
