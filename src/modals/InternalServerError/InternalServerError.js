const Offline = ({closeModal}) => (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal" style={{display:"block"}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Oops!</div>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>
              Unfortunately an error has occured on our end.
            </p>
            
            <p>
              It's not your fault, and our developers have been notified!
            </p>
            
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Offline;
