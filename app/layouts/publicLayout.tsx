import { Outlet } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import PublicFooter from "../components/PublicFooter";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 via-blue-100 to-blue-200">
      <PublicNavbar />
      <main className="w-full px-4 py-8">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;