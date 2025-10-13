// Create ProtectedRoute component - Route guards for dashboard access
import { Navigate } from "react-router-dom";
import Loader from "../common/Loader";

interface ProtectedRouteProps {
	children: React.ReactNode;
}
import { useUserStore } from "../store/userStore";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const user = useUserStore((state) => state.user);
	const loading = useUserStore((state) => state.loading);

	if (loading) return <Loader />;
	if (!user) return <Navigate to="/signin" replace />;
	return <>{children}</>;
};

export default ProtectedRoute;
