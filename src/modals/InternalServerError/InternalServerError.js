import Modal from '../Modal/Modal';

const Offline = ({activated}) => (
  <Modal activated={activated} title="Oops!" render={ () => (
    <>
      <p>Unfortunately an error has occured on our end.</p>
      <p>It's not your fault, and our developers have been notified!</p>
    </>
  ) } />
);

export default Offline;
