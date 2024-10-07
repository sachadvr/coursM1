
const Button = ({ children, onClick }) => (
  <button className="bg-white text-black rounded-sm font-mono" onClick={onClick}>{children}</button>
);

export default Button;
