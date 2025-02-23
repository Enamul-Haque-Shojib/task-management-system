
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import useAuth from '../hooks/useAuth';


const ProtectedRoutes = ({children}) => {
    const { user, loading} = useAuth()
    const location = useLocation()
  
    if (loading){
        return(
          
            <div style={{width:'100%', height:'100vh',display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Spin size="large" />
            </div>
            
        
        )
    }
  
    if (user) return children
    return <Navigate to='/' state={{ from: location }} replace='true' />
};

export default ProtectedRoutes;