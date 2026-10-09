import { Outlet } from 'react-router-dom';

/** Centered shell for Login/Register/Forgot/Reset password pages. */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
