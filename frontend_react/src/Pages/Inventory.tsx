import FishingCards from '../components/FishingCards';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function Inventory({ }) {
    const [items, setItems] = useState([]);

    return (
        <div className="container">
            <div className="row col-12 border border-secondary mt-2 p-3 bg-light">
                <h1 className='text-center'>Inventory</h1>
            </div>
            <div className="row col-12 border border-secondary mt-2 p-3 bg-light">
                {items.map((item: any) => {
                    return <FishingCards onClick={() => { }} key={item.id} title={item.item} type={item.type} size={item.size} photo={item.photo} id={item.id} />
                })}
            </div>
        </div>
    )

}

export default Inventory