import Avatar from './avatar';

const Header = ({ name }: {  name: string | undefined }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
    <div className="flex items-center space-x-3">
      <span className="text-lg font-medium text-gray-800">{name}</span>
      <Avatar name={name} />
    </div>
  </div>
);

export default Header;
