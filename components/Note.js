const Note = ({ note, onEdit, onDelete }) => {
    return (
      <div className="bg-gradient-to-r from-gradientStart to-gradientEnd from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg">


            <div className="max-w-md min-h-[150px]">
        <h3 className="text-xl text-white font-semibold">{note.title}</h3>
        <div className=" text-white break-words">{note.content}</div> 
        </div>
        <div className="flex justify-end gap-2 mt-2">
        <button
  onClick={() => onDelete(note.id)}
  className="border-2 border-red-500 text-white bg-red-500 rounded-lg px-4 py-2 hover:bg-red-700 hover:border-red-700 transition duration-300"
>
  Delete
</button>
        <button
  onClick={() => onEdit(note)}
  className="border-2 border-blue-500 bg-blue-500 text-blue-500 rounded-lg text-white px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-300"
>
  Edit
</button>

        </div>
      </div>
    );
  };
  
  export default Note;
  