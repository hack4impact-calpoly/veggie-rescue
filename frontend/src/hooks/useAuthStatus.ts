import { useState, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'

function useAuthStatus() {
  // Local state 
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
  // Grab driver object from store
    const { driver, isLoading } = useAppSelector((state) => state.driverAuth)
  
    useEffect(() => {
      // If the driver object is not empty then we are authenticated
      if (Object.keys(driver).length !== 0 && !isLoading ) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
      setCheckingStatus(false)
    }, [driver, isLoading])
  
    return { loggedIn, checkingStatus }
}

export default useAuthStatus