import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import useAuthStatus from './hooks/useAuthStatus';

// import Spinner from './components/Spinner'
interface Props extends RouteProps {
  redirectTo: string;
}
function ProtectedRoute({ redirectTo }: Props) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <h1>LOADING.........</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
