import BaseModal from '../BaseModal/BaseModal';

const Offline = ({closeModal}) => (
  <BaseModal closeModal={closeModal} title="Offline" render={ () => (
    <p>Your Connection Appears to be Offline!</p>
  ) } />
);

export default Offline;
