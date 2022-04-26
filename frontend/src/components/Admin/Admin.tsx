import {useEffect} from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';
import { login, reset } from '../../features/driverAuth/driverAuthSlice';
import {getPickups} from '../../features/pickups/pickupsSlice'



function Admin() {

  const dispatch = useAppDispatch();

  const { pickups } = useAppSelector(
    (state) => state.pickups
  );

  useEffect(()=>{
    dispatch(getPickups())
  },[])

  return (
    <div><AdminHeader /></div>
  )
}

export default Admin