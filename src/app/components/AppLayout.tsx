import { Link, Outlet } from "react-router";
import { BrandLogo } from "./BrandLogo";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <Link to="/" className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
            <BrandLogo className="h-9 w-auto" />
          </Link>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
