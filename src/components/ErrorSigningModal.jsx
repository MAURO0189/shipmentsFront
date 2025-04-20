import Modal from "react-modal";

export default function ErrorSigningModal({
  errorModalIsOpen,
  setErrorModalIsOpen,
}) {
  return (
    <Modal
      isOpen={errorModalIsOpen}
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
        <h2 className="text-xl font-semibold text-primary">¡Ops!</h2>
        <br />
        <p className="text-xl font-semibold text-primary">
          Usuario no encontrado. Por favor, verifica el correo electrónico y la
          contraseña.
        </p>
        <button
          className="absolute top-2 right-2 text-primary  hover:text-blue-500"
          onClick={() => setErrorModalIsOpen(false)}
        >
          ✕
        </button>
      </div>
    </Modal>
  );
}
