import { Outlet } from 'react-router';
import DashboardNavbar from "../components/dashboard/dashboardNavbar";
import DashboardSidebar from "../components/dashboard/dashboardSidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="min-h-screen bg-gray-50">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
        <div className="flex">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
            <main className="flex-1 p-4 md:p-6 lg:p-8 md:ml-64 mt-16">
                <Outlet />
            </main>
        </div>
    </div>
  );
}

export default DashboardLayout;