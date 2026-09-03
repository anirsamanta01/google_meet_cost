import React, {useState} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const RootNav = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <MainStack user={user} />
      ) : (
        <AuthStack onAuthenticated={setUser} />
      )}
    </>
  );
};

export default RootNav;
