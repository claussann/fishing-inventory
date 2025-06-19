import { useState } from 'react';

import Buttons from './Buttons';
import ModalPhoto from './ModalPhoto';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

type cardPorps = {
    title: string
    type: string
    size: string
    photo: string
    id: number
    onClick: () => void
}
function FishingCards({ title, type, size, photo, id, onClick }: cardPorps) {
    const [show, setShow] = useState(false);
    return (
        <div id='productCard' className="card m-2 p-2 border border-secondary d-flex justify-content-center" style={{ width: '18rem' }}>
            <div className="d-flex justify-content-center">
                {photo && <img src={`http://localhost:8000/${photo}`} id='productImage' onClick={() => setShow(true)} className="card-img-fluid" style={{ width: '80%', margin: '5px', height: '200px', maxHeight: '200px' }} alt={title} />}
            </div>
            <div className="card-body text-center">
                {title && <h5 className="card-title"> {title}</h5>}
                {type && <p className="card-text">Type: {type}</p>}
                {size && <p className="card-text">Size: {size}</p>}
                <Buttons sx={{ width: '100%' }} onClick={onClick}>Delete</Buttons>
            </div>
            {show && <ModalPhoto  title={type} show={show} photo={photo} handleClose={() => setShow(false)} />}
        </div>
    )
}

export default FishingCards