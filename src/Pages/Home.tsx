import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Buttons from '../components/Buttons';
import ModalProd from '../components/ModalProd';

import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const items = useSelector((state: any) => state.inventory.items);
    const navigate = useNavigate();
    console.log(items)

    const openInventory = () => {
        try {
            if (items) {
                navigate('/inventory')
            } else {
                alert('Inventory is empty')
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="container d-flex" style={{ maxHeight: '100vh' }}>
            <div className='col-12 col-md-6 border border-secondary mt-2 p-3 bg-light'>
                <div className='col-12 text-center'>
                    <h1>Fishing Inventory</h1>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-3'>
                        <Buttons sx={{ width: '100%' }} onClick={() => setShowModal(true)}>Add Item</Buttons>
                    </div>
                    <div className='col-12 col-md-3'>
                        <Buttons sx={{ width: '100%' }} onClick={() => openInventory()}>Open Inventory</Buttons>
                    </div>
                </div>
                {showModal && <ModalProd show={showModal} handleClose={() => setShowModal(false)} />}
            </div>
            <div className='col-12 col-md-6 border border-secondary mt-2 p-3 bg-light d-flex justify-content-center' style={{ maxHeight: '100vh' }}>
                <img src='logo.png' alt='logo' className='img-fluid' style={{ width: '100%' }} />
            </div>
        </div>
    );
}

export default Home;
