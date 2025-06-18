import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Buttons from '../components/Buttons';
import ModalProd from '../components/ModalProd';
import Weather from '../components/Weather';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const openInventory = () => {
        navigate('/inventory')
    }

    return (
        <div id='container' className="container" style={{ maxHeight: '100vh' }}>
            <div id='home' className='row justify-content-between border border-secondary m-3 p-3 bg-light'>
                <div className='col-12 col-md-6 mt-4'>
                    <div id='title' className='col-12 p-1 text-center'>
                        <h1>Fishing Inventory</h1>
                    </div>
                    <div className='col-12'>
                        <Buttons id='button' sx={{ width: '100%' }} onClick={() => setShowModal(true)}>Add Item</Buttons>
                    </div >
                    <div className='col-12 mt-1'>
                        <Buttons id='button' sx={{ width: '100%' }} onClick={() => openInventory()}>Open Inventory</Buttons>
                    </div>
                    <div id='weather' className='row justify-content-center mt-3 m-2'>
                        <Weather />
                    </div>
                    {showModal && <ModalProd show={showModal} handleClose={() => setShowModal(false)} />}
                </div>
                <div className='col-12 col-md-6 mt-1 p-3 d-flex justify-content-center' style={{ maxHeight: '88vh' }}>
                    <img id='logo' src='logo.png' alt='logo' className='img-fluid' style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
}

export default Home;
