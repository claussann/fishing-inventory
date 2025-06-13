import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Buttons from './components/Buttons';
import ModalProd from './components/ModalProd';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const items = useSelector((state: any) => state.inventory.items);
  console.log(items)

  return (
    <div className="container border border-secondary mt-2 p-3 bg-light">
      <div className='row text-center'>
        <h1>Fishing Inventory</h1>
      </div>
      <div className='row d-flex justify-content-center'>
        <div className='col-12 col-md-3'>
          <Buttons sx={{ width: '100%' }} onClick={() => setShowModal(true)}>Add Item</Buttons>
        </div>
        <div className='col-12 col-md-3'>
          <Buttons sx={{ width: '100%' }} onClick={() => { }}>Open Inventory</Buttons>
        </div>
      </div>
      {showModal && <ModalProd show={showModal} handleClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
