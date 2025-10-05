// GuardRoute.jsx
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../context/Token.context';
import { useContext } from 'react';

export default function GuardRoute({ children }) {
  const { token } = useContext(TokenContext);  
  if (token) {
    return <Navigate to={"/home"} />;  
  } else {
    return children;
  }
}
