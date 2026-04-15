export interface ButtonProps {
    btnTxt?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    style?: React.CSSProperties;


}

const Button = ({ btnTxt = "Click Me", onClick, type = "submit", className = "", style = {} }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`mt-3 px-4 py-2 rounded-md cursor-pointer border-none ${className}`}
            style={style}
        >
            {btnTxt}
        </button>
    )
}

export default Button;