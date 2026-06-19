import "./Input.css";

interface InputProps {
    label: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, value, onChange }: InputProps) {
    return (
        <div className="input-group">
            <label>{label}</label>

            <input
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;