type InputProps = {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string
    label: string
    id: string
    type?: string

}



function Input({ id, type, label, placeholder, onChange, value }: InputProps): any {
    return (<>
        <label className="form-label" htmlFor={id}>{label}</label >
        <input id={id} type={type} value={value} onChange={onChange} className="form-control" placeholder={placeholder} />
    </>
    )
}

export default Input