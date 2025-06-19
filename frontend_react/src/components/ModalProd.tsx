// Modal 
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from './Input';

import 'bootstrap/dist/css/bootstrap.min.css';

type ModalProps = {
    show: boolean,
    handleClose: () => void
}
function ModalProd({ show, handleClose }: ModalProps): any {

    const [item, setItem] = useState('');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);

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
        if (e.target.files && e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
        }
    }

    
    async function handleSave() {
    const formData = new FormData();
        formData.append("item", item);
        formData.append("type", type);
        formData.append("size", size);
        if(photo){
            formData.append("photo", photo);
        }
        try {
            await fetch('http://localhost:8000/upload_item.php', {
                method: 'POST',
                body: formData,
            })
        } catch(error) {
            alert(error)
        }
        handleClose()
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
                    <Input type='file' id='foto' label="If you have, load a photo." onChange={handleChangePhoto} placeholder="Photo" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSave} children="Save" />
                <Button variant="secondary" onClick={handleClose} children="Close" />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProd