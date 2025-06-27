import { useState } from 'react';
function Clock(): any {
    const [time, setTime] = useState('');

    setInterval(() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000)

    const loading = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

    return (
        <div>
            {!time ? loading : time}
        </div>
    )
}

export default Clock