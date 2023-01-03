import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSid } from 'redux/auth/auth-selectors';
import { refresh } from 'redux/auth/auth-operations';

import Header from 'components/layout/Header/Header';
import UserRoutes from 'components/Routes/UserRoutes';

function App() {
  const dispatch = useDispatch();
  const sid = useSelector(getSid);

  useEffect(() => {
    dispatch(refresh({ sid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main>
        <UserRoutes />
      </main>
    </>
  );
}

export default App;
