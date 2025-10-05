// ProtectedRoute.jsx
import { useContext } from 'react';
import { TokenContext } from '../../context/Token.context';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(TokenContext);  
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
