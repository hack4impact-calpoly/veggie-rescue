import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

function useAuthStatus() {
  // Local state
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // Grab driver object from store
  const { driver, isLoading } = useAppSelector((state) => state.driverAuth);
  // Grab admin object from store
  const admin = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    // If the driver object is not empty and its not loading OR the admin object is not empty and its not loading we are authenticated
    if (
      (Object.keys(driver).length !== 0 && !isLoading) ||
      (Object.keys(admin.admin).length !== 0 && !admin.isLoading)
    ) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [driver, admin, isLoading]);

  return { loggedIn, checkingStatus };
}

export default useAuthStatus;
