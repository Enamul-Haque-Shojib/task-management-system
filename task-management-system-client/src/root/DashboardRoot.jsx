

import DashboardLayout from '../layout/DashboardLayout';
import ProtectedRoutes from '../routes/ProtectedRoutes';

const DashboardRoot = () => {
    return (
        <div>
             <ProtectedRoutes>
            <DashboardLayout></DashboardLayout>
            </ProtectedRoutes>
        </div>
    );
};

export default DashboardRoot;