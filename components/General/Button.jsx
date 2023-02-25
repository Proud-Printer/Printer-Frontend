
const Button = ({title, onClick, role}) => {
  return (
    <button className={`button outline outline-2 rounded-lg px-5 py-3 font-semibold`} role={role} onClick={onClick}>
        {title}
    </button>
  )
};

export default Button;
