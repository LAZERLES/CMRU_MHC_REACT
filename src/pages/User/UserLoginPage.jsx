import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import FloatingShape from "../../components/FloatingShape/FloatingShape";
import { GoogleLogin } from "@react-oauth/google";

const UserLoginPage = () => {
  // State to toggle between login and registration forms
  const [isRegistering, setIsRegistering] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp, login, isLoggingIn,loginWithGoogle } = useAuthStore();

  // Validation function
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    return true;
  };

  // Handle submit for registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData); // Call signup function from your auth store
    }
  };

  // Handle submit for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      login(formData); // Call login function from your auth store
    }
  };

  const handleSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    loginWithGoogle(idToken);
  };

  // Toggle to show the registration form
  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className="hero bg-base-200 min-h-screen overflow-hidden relative">
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

      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {isRegistering ? "Register" : "Login"} now!
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            className="card-body"
            onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
          >
            {!isRegistering ? (
              <>
                {/* Login Form */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin mr-2" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <div className="form-control mt-4">
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="btn btn-link"
                  >
                    Don't have an account? Register here
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Register Form */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={formData.f_name}
                    onChange={(e) =>
                      setFormData({ ...formData, f_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={formData.l_name}
                    onChange={(e) =>
                      setFormData({ ...formData, l_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin mr-2" />
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
                <div className="form-control mt-4">
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="btn btn-link"
                  >
                    Already have an account? Login here
                  </button>
                </div>
              </>
            )}

            <div className="divider">OR</div>
            <div className="flex justify-center">
              <GoogleLogin
                className="hidden"
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
                text="continue_with"
                size="large"
                theme="outline"
                type="standard"
                shape="circle"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
