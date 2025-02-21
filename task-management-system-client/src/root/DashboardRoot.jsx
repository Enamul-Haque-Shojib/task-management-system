
// import ProtectedRoutes from '../layout/ProtectedRoutes';
import DashboardLayout from '../layout/DashboardLayout';

const DashboardRoot = () => {
    return (
        <div>
             {/* <ProtectedRoutes role={undefined}> */}
            <DashboardLayout></DashboardLayout>
            {/* </ProtectedRoutes> */}
        </div>
    );
};

export default DashboardRoot;