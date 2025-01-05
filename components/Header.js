import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl">My Notes App</h1>
      <button onClick={handleLogout} className="bg-red-500 p-2 rounded-md">Logout</button>
    </div>
  );
};

export default Header;
