import Buttons from './Buttons';

import 'bootstrap/dist/css/bootstrap.min.css';

type cardPorps = {
    title: string
    type: string
    size: string
    photo: string
    id: string
    onClick: () => void
}
function FishingCards({ title, type, size, photo, id, onClick }: cardPorps) {
    return (
        <div className="card m-2 p-2 bg-light border border-secondary d-flex justify-content-center" style={{ width: '18rem' }}>
            <div className="d-flex justify-content-center">
                {photo && <img src={photo} className="card-img-fluid" style={{ width: '80%', margin: '5px' }} alt={title} />}
            </div>
            <div className="card-body text-center">
                {title && <h5 className="card-title"> {title}</h5>}
                {type && <p className="card-text">Type: {type}</p>}
                {size && <p className="card-text">Size: {size}</p>}
                <Buttons sx={{ width: '100%' }} onClick={onClick}>Delete</Buttons>
            </div>
        </div>
    )
}

export default FishingCards