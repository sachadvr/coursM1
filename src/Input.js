import { useEffect } from "react";

const Input = ({
  text,
  onChange
}) => {
  useEffect(() => {
    console.log(text);
  }, [text])
  return (
    <input type="text" onChange={(e) => onChange(e.target.value)} value={text} className="border-2 border-purple-300 p-2 text-black" />
  )
}

export default Input;
