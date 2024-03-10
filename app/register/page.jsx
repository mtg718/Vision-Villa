"use client"
import "@styles/Register.scss";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const router = useRouter();

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profileImage) {
      setError("Profile photo is required!");
      return;
    }
    setIsLoading(true);
    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("/api/register/", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        router.push("/login");
      } else if (response.status === 409) {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <input
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "108%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <input
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {passwordVisible ? (
                <IoIosEyeOff
                  style={{ color: "white", fontSize: "1.5rem" }}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoMdEye
                  style={{ color: "white", fontSize: "1.5rem" }}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "108%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <input
                placeholder="Confirm Password"
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {confirmPasswordVisible ? (
                <IoIosEyeOff
                  style={{ color: "white", fontSize: "1.5rem" }}
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <IoMdEye
                  style={{ color: "white", fontSize: "1.5rem" }}
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
            <input
              id="image"
              type="file"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              style={{ display: "none" }}
              required
            />
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add profile" />
              <p>Upload Profile Photo</p>
            </label>
            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile"
                style={{ maxWidth: "80px", maxHeight: "100px" }}
              />
            )}
            {error && <p className="error">{error}</p>}{" "}
            {/* Display error message */}
            <button type="submit" disabled={!passwordMatch || isLoading}>
              {isLoading ? <span>Wait...</span> : <span>Register</span>}
            </button>
          </div>
        </form>
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default Register;
