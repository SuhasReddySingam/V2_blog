import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import CreatePage from "./pages/CreatePage";
import AICreate from "./pages/AICreate"
import HomePage from "./pages/DashboardPage";
import ViewPage from "./pages/ViewPage";


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		console.log("Redirected user");
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
			<div
			className='min-h-screen bg-gradient-to-br
			from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden'
			>

			<Routes>
				<Route
					path='/'
					element={<ProtectedRoute>
							<DashboardPage />
							</ProtectedRoute>
					}
					/>
					
				<Route path='/create' element={<ProtectedRoute>
					<AICreate />
					</ProtectedRoute>
			
			} />
			<Route path='/create-norm' element={<ProtectedRoute>
					<CreatePage />
					</ProtectedRoute>
			
			} />
				<Route path='/view/:name' element={<ProtectedRoute>
					<ViewPage />
					</ProtectedRoute>
			
			} />
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
					/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
					/>
				
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
			</div>

	
	);
}

export default App;