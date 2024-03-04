import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // 모달이 마운트되는 위치를 설정

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="주소 검색">
      {children}
    </Modal>
  );
};

export default ModalComponent;
