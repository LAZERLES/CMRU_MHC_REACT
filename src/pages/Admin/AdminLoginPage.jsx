import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";
import FloatingShape from "../../components/FloatingShape/FloatingShape";

const AdminLoginPage = () => {
  // State to toggle between login and registration forms
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginAdmin, isLoggingIn } = useAuthStore();

  // Validation function
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    return true;
  };

  // Handle submit for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      loginAdmin(formData); // Call login function from your auth store
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen overflow-hidden relative flex flex-col justify-center items-center">
      {/* Floating shapes for dynamic background */}
      <FloatingShape
        color="bg-primary"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-secondary"
        size="w-64 h-64"
        top="-5%"
        left="80%"
        delay={0}
      />
      <FloatingShape
        color="bg-error"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-warning"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl px-6 py-8 bg-base-100 shadow-lg rounded-xl">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left ml-4">
          <h1 className="text-4xl font-semibold text-primary mb-4">
            ยินดีต้อนรับสู่ Admin Panel!
          </h1>
          <p className="text-lg text-neutral-content mb-6">
            กรุณาลงชื่อเข้าใช้เพื่อเข้าสู่ระบบ Admin
          </p>
        </div>

        {/* Login Form Section */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6 rounded-lg">
          {/* Image */}
          <div className="relative mb-6">
            <img
              className="rounded-xl shadow-xl w-full h-48 object-cover"
              src="https://img.freepik.com/free-vector/multitasking-concept-with-man-desk-illustrated_23-2148392549.jpg?t=st=1737915225~exp=1737918825~hmac=bca3360cbbee02472ee5ae556060adcd1cc7abd6702e1523db31817cff1bd01d&w=1380"
              alt="Admin panel"
            />
          </div>

          {/* Form */}
          <form className="card-body" onSubmit={handleLoginSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered bg-base-200 text-base-content rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered bg-base-200 text-base-content rounded-md"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-neutral-500"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-primary text-base-100 hover:bg-primary-focus transition-all duration-300 rounded-md shadow-lg"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
