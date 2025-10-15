import {Navigate} from "react-router-dom";
import {useAppwriteAuth} from "../contexts/AppwriteAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
  const {user, loading} = useAppwriteAuth();

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center transition-colors duration-300'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 dark:border-emerald-400'></div>
          <p className='mt-4 text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
