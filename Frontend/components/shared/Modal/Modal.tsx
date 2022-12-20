import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { AiOutlineClose } from "react-icons/ai";


interface Modalinterface {
  children: any;
  SetOpen: Function;
  SetVideoPictureApear?: Function;
  ExtraClass?: string;
  CloseBtn?: boolean;
  CloseBtnFunc?: Function;
  CloseBtnColor?: string;

}

function Modal(props: Modalinterface) {
  const [isBrowser, setIsBrowser] = useState(false);
  let ModalRef = useRef<HTMLDivElement>(null);
  // const modalRoot = document?.getElementById("modal");
  useEffect(() => {
    setIsBrowser(true);
  }, []);



  //ON CLICK OUTSIDE OF MODAL
  useEffect(() => {

    function handleClickOutside(event: any) {
      if (ModalRef.current && !ModalRef.current.contains(event.target)) {
        props.SetOpen(false);
        if (props.SetVideoPictureApear) { props.SetVideoPictureApear(true); }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ModalRef]);

  /////////////////////////////////////////
  //Modal component is rendered in the document.tsx file
  const ModalContent = (
    <div className={ModalWrapper + " " + props?.ExtraClass}>
      <RemoveScrollBar />
      <div className='relative' ref={ModalRef}>
        {
          props.CloseBtn &&
          <AiOutlineClose
            className="cursor-pointer absolute top-0 right-0 mr-2 mt-2 z-50"
            color={props.CloseBtnColor ? props.CloseBtnColor : "black"}
            onClick={() => { props.CloseBtnFunc ? props.CloseBtnFunc() : props.SetOpen(false) }}
            fontSize={30} />
        }

        {props.children}
      </div>
    </div>
  );
  /////////////////////////////////////////////////

  if (isBrowser && document?.getElementById("modal")) {
    return ReactDOM.createPortal(
      ModalContent, document.getElementById("modal") as Element
    );
  } else {
    return null;
  }

}

export default Modal;
const ModalWrapper = classNames("fixed z-50   top-0  left-0  w-full  h-full   bg-gray-900  bg-opacity-50  flex  justify-center  items-center");
