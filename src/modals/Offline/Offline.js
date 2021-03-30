import Modal from '../Modal/Modal';

const Offline = ({activated}) => (
  <Modal activated={activated} title="Offline" render={ () => (
    <p>Your Connection Appears to be Offline!</p>
  ) } />
);

export default Offline;
