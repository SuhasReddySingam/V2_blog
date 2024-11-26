import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import FloatingShape from "../components/FloatingShape";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();
	const{ googlelogin }=useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};
	const handleGoogleLogin=async(e)=>{
		e.preventDefault();
		await googlelogin();
	}

	return (
		<div className="flex justify-center items-center min-h-screen flex-col">
			<FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-indigo-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-cyan-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
					{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
						>
						{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-blue-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
	
		</motion.div>
		
	</div>
	);
};
export default LoginPage;
