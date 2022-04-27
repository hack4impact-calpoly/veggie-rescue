import { useEffect } from 'react';
import { toast } from 'react-toastify'; //this is for the pop up
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getDonors, createDonor, updateDonor, deleteDonor } from '../../features/donors/donorSlice'

const ReduxExample = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    // dispatch(getDonors());
    // dispatch(createDonor({
    //   id: "0",
    //   name: 'Sam',
    //   EntityType: 'HELLO!',
    //   FoodType: "WOH",
    //   LocationType: "IT WORK",
    //   CombinedAreaName: "COOL",
    // }));
  //   dispatch(updateDonor(    {
  //     id: "62635d57127e4a1fb7e6558e",
  //     name: "Sam",
  //     EntityType: "FARM HOUSE 35",
  //     FoodType: "This should update!",
  //     LocationType: "IT WORK",
  //     CombinedAreaName: "TEST",
  // }))
  dispatch(deleteDonor("62635d57127e4a1fb7e6558e"));
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
      <button className='bg-slate-500 rounded-xl p-5' onClick={onClick}> CLICK TO add!</button>
    </div>
  );
};

export default ReduxExample;
