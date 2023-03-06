import { useEffect } from 'react';
import useAuthContext from '../context/AuthContext';

const Home = () => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) getUser();
  }, []);

  return (
    <div>
      <h2>{user?.name}</h2>
    </div>
  );
};

export default Home;
