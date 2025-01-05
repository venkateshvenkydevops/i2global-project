const Input = ({ id, type, name, placeholder, value, onChange }) => {
    return (
      <div className="mb-4">
        <input
          id={id}
          type={type}
          name={name}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default Input;
  