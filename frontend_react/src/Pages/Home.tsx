import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Buttons from '../components/Buttons';
import ModalProd from '../components/ModalProd';

import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from '../components/Weather';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const openInventory = () => {
        navigate('/inventory')
    }

    return (
        <div className="container" style={{ maxHeight: '100vh' }}>
            <div className='row justify-content-between border border-secondary m-3 p-3 bg-light'>
                <div className='col-12 col-md-6'>
                    <div className='col-12 text-center'>
                        <h1>Fishing Inventory</h1>
                    </div>
                    <div className='col-12'>
                        <Buttons sx={{ width: '100%' }} onClick={() => setShowModal(true)}>Add Item</Buttons>
                    </div >
                    <div className='col-12 mt-1'>
                        <Buttons sx={{ width: '100%' }} onClick={() => openInventory()}>Open Inventory</Buttons>
                    </div>
                    <div className='row justify-content-center mt-3 m-2'>
                        <Weather />
                    </div>
                    {showModal && <ModalProd show={showModal} handleClose={() => setShowModal(false)} />}
                </div>
                <div className='col-12 col-md-6 border border-secondary mt-2 p-3 bg-light d-flex justify-content-center' style={{ maxHeight: '88vh' }}>
                    <img src='logo.png' alt='logo' className='img-fluid' style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
}

export default Home;
