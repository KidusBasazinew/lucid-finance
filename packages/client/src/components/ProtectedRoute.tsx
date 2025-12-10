import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { isAuthenticated } from '@/lib/auth';

export default function ProtectedRoute({
   children,
}: {
   children: React.ReactNode;
}) {
   const location = useLocation();
   if (!isAuthenticated()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }
   return <>{children}</>;
}
