import './LogoStarter.css'

function LogoStarter() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <img src='LogoStarter.png' alt='logo' className='zoomInDown img-fluid' style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center d-flex justify-content-center">
                    <h5><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</h5>
                </div>
            </div>
        </div>
    )
}

export default LogoStarter