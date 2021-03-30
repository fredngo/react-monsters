import Modal from '../Modal/Modal';

const Offline = ({closeModal}) => (
  <Modal closeModal={closeModal} title="Offline" render={ () => (
    <p>Your Connection Appears to be Offline!</p>
  ) } />
);

export default Offline;
