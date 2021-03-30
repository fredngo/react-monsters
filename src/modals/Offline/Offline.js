import Modal from '../Modal/Modal';

const Offline = ({activated, closeModal}) => (
  <Modal activated={activated} closeModal={closeModal} title="Offline" render={ () => (
    <p>Your Connection Appears to be Offline!</p>
  ) } />
);

export default Offline;
