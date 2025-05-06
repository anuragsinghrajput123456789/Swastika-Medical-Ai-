
import * as React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No authentication check required - all routes are accessible
  return <>{children}</>;
};

export default ProtectedRoute;
