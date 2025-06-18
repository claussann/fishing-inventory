import FishingCards from '../components/FishingCards';
import Buttons from '../components/Buttons';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

type FishingType = {
    title: string;
    type: string;
    size: string;
    photo: string;
    id: number;
}
function Inventory() {
    const [items, setItems] = useState<FishingType[]>([]);
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/Home')
    }

    const product = [{
        title: 'Fishing Road',
        type: 'SurfCasting',
        size: '250 gr',
        photo: 'https://m.media-amazon.com/images/I/51qcFM4HVTL._AC_UF894,1000_QL80_DpWeblab_.jpg',
        id: 1
    },
    {
        title: 'Baits',
        type: 'Rapala',
        size: '25 gr',
        photo: 'https://www.rhodani.com/178801-large_default/shadow-rap-rapala.jpg',
        id: 2
    },
    {
        title: 'Fishing Line',
        type: 'Fluorocarbon',
        size: '0.20',
        photo: 'https://www.boscolosport.com/media/d4/98/c4/1677748899/filo-berkley-trilene-fluorocarbon-1.jpeg',
        id: 3
    },
    {
        title: 'Fishing Reel',
        type: 'Shimano',
        size: '4000',
        photo: 'https://blackhooksnc.com/wp-content/uploads/2022/10/1329.jpg',
        id: 4
    }
    ]

    useEffect(() => {
        setItems(product);
    }, []);

    const deletItem = (id: number) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
    }
    if (items.length === 0) {
        return (
            <div className="container">
                <div className="row col-12 border border-secondary mt-3 p-3 bg-light">
                    <div className='col-10 d-flex m-1 justify-content-center'>
                        <h1 className='text-center'>Inventory</h1>
                    </div>
                    <div className='col-2 d-flex justify-content-end'>
                        <Buttons onClick={goHome}>Go to Home</Buttons>
                    </div>
                </div>
                <div className="row col-12 border border-secondary p-3 bg-light">
                    <h1 className='text-center'>Inventory is empty</h1>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row col-12 border border-secondary mt-3 p-3 bg-light">
                    <div className='col-10 d-flex justify-content-center'>
                        <h1 className='text-center'>Inventory</h1>
                    </div>
                    <div className='col-2 d-flex justify-content-end'>
                        <Buttons onClick={goHome}>Go to Home</Buttons>
                    </div>
                </div>
                <div className="row col-12 d-flex justify-content-center border border-secondary mt-2 p-3 bg-light">
                    {items.map((item: any) => {
                        return <FishingCards onClick={() => deletItem(item.id)} key={item.id} title={item.item} type={item.type} size={item.size} photo={item.photo} id={item.id} />
                    })}
                </div>
            </div>
        )
    }

}

export default Inventory