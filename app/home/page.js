'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Note from '../../components/Note';
import { addNote, deleteNote, editNote } from '../../store/notesSlice';
import { logoutUser } from '../../store/authSlice';
import { useForm } from 'react-hook-form';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteData, setNoteData] = useState({ title: '', content: '', id: null });
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const username = user?.username || 'Guest';

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    dispatch(logoutUser());
    router.push('/login');
  };

  const onSubmit = (data) => {
    if (noteData.id) {
      dispatch(editNote({ ...data, id: noteData.id }));
    } else {
      const newNote = { ...data, id: Date.now() };
      dispatch(addNote(newNote));
    }
    setIsModalOpen(false);
    setNoteData({ title: '', content: '', id: null });
    reset();
  };

  const handleEdit = (note) => {
    setNoteData({ title: note.title, content: note.content, id: note.id });
    setIsModalOpen(true);
  };

  const handleDelete = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 bg-white p-1.5 shadow-lg">

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Note
          </button>
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-4">Welcome , {username}</span>
          </div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl mb-4">{noteData.id ? 'Edit your note' : 'Add a new note'}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    defaultValue={noteData.title}
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Content"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    defaultValue={noteData.content}
                    {...register("content", { required: "Content is required" })}
                  />
                  {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {noteData.id ? 'Save Changes' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
