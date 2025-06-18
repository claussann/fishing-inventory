type ButtonProps = {
    children: string,
    onClick: () => void,
    sx?: any,
    id?: string
}

function Buttons({ children, id, onClick, sx }: ButtonProps): any {
    return (
        <button id={id} className="btn btn-outline-secondary" style={sx} onClick={onClick}>{children}</button>
    )
}

export default Buttons