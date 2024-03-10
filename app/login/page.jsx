"use client"
import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (response.ok) {
        router.push("/");
      }

      if (response.error) {
        setError("Invalid email or password. Please try again!");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor" />
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {" "}
            {/* Disable button when loading */}
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <button className="google" onClick={loginWithGoogle}>
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default Login;
