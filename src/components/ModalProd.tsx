// Modal 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../inventorySlice/inventorySlice';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from './Input';

import 'bootstrap/dist/css/bootstrap.min.css';

type ModalProps = {
    show: boolean,
    handleClose: () => void
}
function ModalProd({ show, handleClose }: ModalProps): any {
    const dispatch = useDispatch();

    const [item, setItem] = useState('');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [photo, setPhoto] = useState('');

    const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value);
    }
    const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSize(e.target.value);
    }
    const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    }
    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.target.value);
    }
    const saveItem = () => {
        dispatch(addItem({ item, size, type, photo }));
        setItem('');
        setSize('');
        setType('');
        setPhoto('');
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='m-2'>
                    <Input type='text' id="item" label="Fishing Road, Tackle, Fishing Line, Reel, Baits:" onChange={handleChangeItem} value={item} placeholder="Item" />
                </div>
                <div className='m-2'>
                    <Input type='text' id="type" label='Brand, Fishing Style' onChange={handleChangeType} value={type} placeholder="Type" />
                </div>
                <div className='m-2'>
                    <Input type='text' id="size" label="Size, Weight, Length" onChange={handleChangeSize} value={size} placeholder="Size" />
                </div>
                <div className='m-2'>
                    <Input type='file' id='foto' label="If you have, load a photo." onChange={handleChangePhoto} value={photo} placeholder="Photo" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={saveItem} children="Save" />
                <Button variant="secondary" onClick={handleClose} children="Close" />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProd