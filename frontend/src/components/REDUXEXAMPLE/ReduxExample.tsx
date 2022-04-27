import { useEffect } from 'react';
import { toast } from 'react-toastify'; //this is for the pop up
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getDonors, createDonor } from '../../features/donors/donorSlice'

const ReduxExample = () => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(createDonor({
      id: "0",
    name: "Tod McMuffin",
    EntityType: "buncha weeds",
    FoodType: "garbage foods",
    LocationType: "Dumpster",
    CombinedAreaName: "Your house",
    
  }));
  };

  const { donors, isError, isSuccess, message } = useAppSelector(
    (state) => state.donors
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successly receieved list of donors from db');
    }
    if (isError) {
      toast.error('Error unable to get list of donors from db');
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-row items-center justify-center bg-state-100 h-screen">
      <button className='bg-slate-500 rounded-xl p-5' onClick={onClick}> CLICK TO POPULATE Welcome </button>
    </div>
  );
};

export default ReduxExample;
