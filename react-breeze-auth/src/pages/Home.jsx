import useAuthContext from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className='max-w-7xl mx-auto mt-6'>
      <h2>{user?.name}</h2>
    </div>
  );
};

export default Home;
