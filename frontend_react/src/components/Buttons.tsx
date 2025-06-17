type ButtonProps = {
    children: string,
    onClick: () => void,
    sx?: any,
}

function Buttons({ children, onClick, sx }: ButtonProps): any {
    return (
        <button className="btn btn-outline-secondary"  style={sx} onClick={onClick}>{children}</button>
    )
}

export default Buttons