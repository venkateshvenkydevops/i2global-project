const Button = ({ text, onClick }) => {
    return (
      <button onClick={onClick} className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
        {text}
      </button>
    );
  };
  
  export default Button;
  