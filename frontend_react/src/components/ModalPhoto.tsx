// Modal 
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

type ModalProps = { show: boolean, handleClose: () => void, photo: string, title: string };
function ModalPhoto({ show, title, photo, handleClose }: ModalProps): any {
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img id='product' src={photo} alt='photo' className='fade-in img-fluid' />
            </Modal.Body>    
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} children="Close" />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalPhoto