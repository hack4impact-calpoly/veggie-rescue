import { useEffect } from 'react';
import { toast } from 'react-toastify'; //this is for the pop up
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPickups } from '../../features/pickups/pickupsSlice'

const ReduxExample = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(getPickups());
  };

  const { pickups, isError, isSuccess, message } = useAppSelector(
    (state) => state.pickups
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successly receieved list of recipients from db');
    }
    if (isError) {
      toast.error('Error unable to get list of recipients from db');
    }
  }, [getPickups, isSuccess, isError]);

  return (
    <div className="flex flex-row items-center justify-center bg-state-100 h-screen">
      <button className='bg-slate-500 rounded-xl p-5' onClick={onClick}> CLICK TO POPULATE</button>
    </div>
  );
};

export default ReduxExample;
