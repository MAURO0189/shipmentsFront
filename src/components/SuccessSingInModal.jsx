import Modal from "react-modal";

export default function SuccessSingInModal({
  successrModalIsOpen,
  setSuccessrModalIsOpen,
}) {
  return (
    <Modal
      isOpen={successrModalIsOpen}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          border: "none",
        },
      }}
    >
      <div className="custom-modal-content">
        <h2 className="alert">Ingreso Exitoso</h2>
        <br />
        <button
          className="close-button"
          onClick={() => setSuccessrModalIsOpen(false)}
        >
          <span>&times;</span>
        </button>
      </div>
    </Modal>
  );
}
