import { useEffect } from 'react';
import { toast } from 'react-toastify'; //this is for the pop up
import { useAppSelector, useAppDispatch } from '../../app/hooks';
<<<<<<< HEAD
import { getDonors, createDonor } from '../../features/donors/donorSlice'
=======
import { getPickups, createPickup } from '../../features/pickups/pickupsSlice';
import { getVehicle } from '../../features/vehicles/VehiclesSlice';
>>>>>>> 032f24c (Connected back to front loggging and vehicles)

const ReduxExample = () => {

  const dispatch = useAppDispatch();

  const onClick = () => {
<<<<<<< HEAD
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
=======
    // // uncomment for createPickup example (will post to MongoDB)
    // dispatch(
    //   createPickup({
    //     name: 'catlin ranch',
    //     donorEntityType: 'farm',
    //     foodType: 'produce',
    //     area: 'ventura county',
    //     date: '10-01-2020',
    //     driver: 'bob',
    //     vehicle: 'truck',
    //     lbsPickedUp: 35
    //   })
    // );
    // dispatch(getPickups());
    dispatch(getVehicle());
  };

  const { vehicles, isError, isSuccess, message } = useAppSelector(
    (state) => state.vehicle
>>>>>>> 032f24c (Connected back to front loggging and vehicles)
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
<<<<<<< HEAD
      <button className='bg-slate-500 rounded-xl p-5' onClick={onClick}> CLICK TO POPULATE Welcome </button>
=======
      <button className="bg-slate-500 rounded-xl p-5" onClick={onClick}>
        {' '}
        CLICK TO POPULATE
      </button>
>>>>>>> 032f24c (Connected back to front loggging and vehicles)
    </div>
  );
};

export default ReduxExample;
