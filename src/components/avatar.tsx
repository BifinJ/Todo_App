import { logout } from '@/app/firebase_config';
import { Dropdown } from '@/app/icons/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function getRandomColor() {
  const colors = [
    '#6D83F2', '#FFB74D', '#81C784', '#FF8A65', '#64B5F6',
    '#BA68C8', '#4DD0E1', '#FFD54F', '#4DB6AC', '#9575CD'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function Avatar({ name }: { name: string | undefined }) {
  const [bgColor, setBgColor] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async() => {
    console.log('Logout clicked');
    try {
      await logout();
      sessionStorage.removeItem('user')
      console.log('logged out');
      router.push('/login')
    } catch (error) {
      if(error instanceof Error) 
        console.error('Error logging out:', error.message);
      else
        console.error('Error logging out:', error);
    }
  };

  return (
    <div className="relative flex items-center space-x-2">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-white font-bold text-lg">
          {name ? name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
      
      {/* Dropdown icon */}
      <button onClick={toggleDropdown} className="focus:outline-none">
        <Dropdown />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div className="absolute top-10 right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
