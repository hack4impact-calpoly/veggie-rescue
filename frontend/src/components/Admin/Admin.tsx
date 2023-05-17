// import { useEffect } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { getPickups } from '../../features/pickups/pickupsSlice';

function Admin() {
  // const dispatch = useAppDispatch();

  // const { pickups } = useAppSelector((state) => state.pickups);

  // useEffect(() => {
  //   dispatch(getPickups());
  // }, []);

  return (
    <div>
      <AdminHeader />
    </div>
  );
}

export default Admin;
