import toast from "react-hot-toast";
import axios from "../utils/api";
import React, { useState } from "react";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { register, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("ankit@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    setLoading(true);
    await register({ name, email, password });
    toast.success("Registration Successful! ✅");
    navigate("/dashboard");
  } catch {
    toast.error("Registration Failed! ❌");
  } finally {
    setLoading(false);
  }
};

const handleLogin = async () => {
  try {
    setLoading(true);
    await login({ email, password });
    toast.success("Login Successful! ✅");
    navigate("/dashboard");
  } catch {
    toast.error("Login Failed! ❌");
  } finally {
    setLoading(false);
  }
};

  const handleAuth = async (e) => {
    e.preventDefault();

    const result = isLogin
      ? loginSchema.safeParse({ email, password })
      : registerSchema.safeParse({ name, email, password });

    if (!result.success) {
      const errorMessages = result.error.issues[0].message;
      setErrorMessage(errorMessages);
      return;
    }

    isLogin ? await handleLogin() : await handleRegister();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      {loading && <Loading />}
      <div className="w-full max-w-sm rounded-xl bg-white/80 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-black">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-black"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-900"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Dashboard Access Only
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-black underline cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
