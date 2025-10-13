import { lazy, useEffect, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useThemeStore } from "./store/themeStore";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Toast from "./common/Toast";

const Loader = lazy(() => import("./common/Loader"));

const Home = lazy(() => import("./pages"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Page404 = lazy(() => import("./pages/404"));

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<BrowserRouter>
				<Toast />
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/dashboard/*" element={<Dashboard />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
};

export default App;
