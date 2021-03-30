import {createContext, useContext} from 'react';

export const SetModalContext = createContext();

const Modal = ({activated, title, render}) => {

  const setModal = useContext(SetModalContext);

  return !activated? null :
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal" style={{display:"block"}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{title}</div>
              <button type="button" className="close" onClick={()=> setModal(false)}>
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
}



export default Modal;
