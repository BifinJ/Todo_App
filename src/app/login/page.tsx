"use client";
import { useState } from 'react';
import axios from 'axios';
import { ArrowRightIcon, EmailIcon, GoogleIcon, PasswordIcon, SpinnerIcon, UserIcon } from '../icons/icons';
import { loginWithEmail, loginWithGoogle, signUpWithEmail } from '../firebase_config';
import { useAuth } from '../Context/AuthContext';
import { User } from '../types';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { setUser } = useAuth(); // Access setUser from AuthContext
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await loginWithEmail(email, password);
        console.log(userCredential);
        if (userCredential?.user) {
          const response = await axios.put('/api/user/get', { email });
          console.log(response);
          console.log("login response", response.data.user.email, response.data.user.name);
          const user : User = {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
            }
          setUser(user); // Set user data in AuthContext
          router.push("/todo")
        }
      } else {
        if (password === confirmPassword) {
          userCredential = await signUpWithEmail(email, password);
          console.log(userCredential)
          if (userCredential?.user) {
            // await sendEmailVerification(userCredential?.user); // Send email verification
            // setError("Verification email sent. Please check your inbox.");
            const response = await axios.post('/api/user/create', {
              email,
              username,
            });
            console.log("signup response", response.data.user.email, response.data.user.name);
            const user : User = {
              id: response.data.user.id,
              email: response.data.user.email,
              name: response.data.user.name,
            }
            setUser(user); // Set user data in AuthContext
            router.push("/todo")
          }
        } else {
          setError("Passwords do not match.");
          return;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      } else {
        setError("An unknown error occurred.");
        console.error("An unknown error occurred:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await loginWithGoogle();
      console.log("Google Sign-In successful", userCredential);
      if (userCredential?.user) {
        const response = await axios.post('/api/user/create', {
          email: userCredential.user.email,
          username: userCredential.user.displayName,
        });
        console.log(response)
        const user : User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
        }
        setUser(user)
        router.push("/todo")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err);
      } else {
        setError("An unknown error occurred.");
        console.error("An unknown error occurred:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transform transition-all ease-in-out duration-300 hover:scale-105">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? "Welcome back" : "Welcome"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please {isLogin ? "sign in to" : "register"} your account
          </p>
          {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            {!isLogin && <div className="relative">
              <label className="sr-only" htmlFor="username">
                UserName
              </label>
              <UserIcon />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Username"
              />
            </div>}

            <div className="relative">
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <EmailIcon />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <PasswordIcon />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Password"
              />
            </div>


            {!isLogin && <div className="relative">
              <label className="sr-only" htmlFor="password">
                Confirm Password
              </label>
              <PasswordIcon />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                placeholder="Confirm Password"
              />
            </div>}
          </div>

          {isLogin && <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center text-white">
                  <SpinnerIcon />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {isLogin ? "Sign in" : "Sign up"}
                  <ArrowRightIcon />
                </span>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-1/2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <GoogleIcon />
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
              {isLogin ? "Sign up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
