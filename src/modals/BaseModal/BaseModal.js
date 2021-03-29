const BaseModal = ({closeModal, title, render}) => (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal" style={{display:"block"}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            { render() }
          </div>
        </div>
      </div>
    </div>
  </>
);

export default BaseModal;
