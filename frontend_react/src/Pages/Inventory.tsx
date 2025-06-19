import FishingCards from '../components/FishingCards';
import Buttons from '../components/Buttons';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

type FishingType = {
    title: string;
    type: string;
    size: string;
    photo: string;
    id: number;
}
function Inventory() {
    const [product, setProduct] = useState<FishingType[]>([]);
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/Home')
    }

    async function fetchItems() {
        const data = await fetch('http://localhost:8000/upload_item.php')
        const items = await data.json()
        setProduct(items);
        return items
    }

    useEffect(() => {
        fetchItems()
    }, []);

    const deletItem = async (id: number) => {
        try {
            const data = await fetch('http://localhost:8000/upload_item.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            if (data.ok) {
                alert('Item deleted')
                setProduct(product.filter(item => item.id !== id));
            } else {
                alert('Item not deleted')
            }
        } catch (error) {
            alert(error)
        }
    }
    if (product.length === 0) {
        return (
            <div className="container">
                <div id='inventory' className="row border border-secondary m-1 mt-3 p-3">
                    <div className='row d-flex m-1 justify-content-between'>
                        <div className='col-10'>
                            <h1 className='text-center'>Inventory</h1>
                        </div>
                        <div className='col-2 d-flex justify-content-end'>
                            <Buttons id='button' onClick={goHome}>Go to Home</Buttons>
                        </div>
                    </div>
                </div>
                <div id='items' className="row border border-secondary m-1 p-3">
                    <h1 className='text-center'>Inventory is empty</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div id='inventory' className="row border border-secondary m-1 mt-3 p-3">
                    <div className='row d-flex justify-content-between'>
                        <div className='col-10'>
                            <h1 className='text-center'>Inventory</h1>
                        </div>
                        <div className='col-2 d-flex justify-content-end'>
                            <Buttons id='button' onClick={goHome}>Go to Home</Buttons>
                        </div>
                    </div>
                </div>
                <div id='items' className="row d-flex justify-content-center border border-secondary m-1 mt-2 p-3">
                    {product.map((item: any) => {
                        return <FishingCards onClick={() => deletItem(item.id)} key={item.id} title={item.item} type={item.type} size={item.size} photo={item.photo} id={item.id} />
                    })}
                </div>
            </div>
        )
    }

}

export default Inventory