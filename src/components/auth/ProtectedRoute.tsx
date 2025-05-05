
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Simplified ProtectedRoute that doesn't restrict access
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
