import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/studentApi";
import "./LoginStyles.css";

const ROLE_HOME = {
  admin: "/admin/courses",
  teacher: "/teacher/classes",
  student: "/student",
};

const ROLE_EMAIL_PLACEHOLDER = {
  admin: "admin@mybvc.ca",
  teacher: "first.last.00001@mybvc.ca",
  student: "first.last.00000@mybvc.ca",
};

export default function Login() {
  const navigate = useNavigate();

  const [view, setView] = useState("login");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      return "Please enter your email address.";
    }

    if (!emailPattern.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  function validateLogin() {
    const emailError = validateEmail();

    if (emailError !== "") {
      return emailError;
    }

    if (password.trim() === "") {
      return "Please enter your password.";
    }

    return "";
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const validationError = validateLogin();

    if (validationError !== "") {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const data = await loginUser(email.trim(), password);
      const userRole = String(data.role ?? data.Role ?? "").toLowerCase();

      localStorage.setItem("token", data.token ?? data.Token ?? "");
      localStorage.setItem("email", data.email ?? data.Email ?? email.trim());
      localStorage.setItem("userId", String(data.userId ?? data.UserId ?? ""));
      localStorage.setItem("role", userRole);

      navigate(ROLE_HOME[userRole] || "/", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleForgotSubmit(event) {
    event.preventDefault();

    const validationError = validateEmail();

    if (validationError !== "") {
      setError(validationError);
      return;
    }

    setError("");
    setResetSent(true);
  }

  function showForgot() {
    setError("");
    setView("forgot");
  }

  function showLogin() {
    setError("");
    setResetSent(false);
    setView("login");
  }

  function chooseRole(selectedRole) {
    setRole(selectedRole);
    setError("");
  }

  let errorBanner = null;

  if (error !== "") {
    errorBanner = (
      <p className="login-error" role="alert">
        {error}
      </p>
    );
  }

  if (view === "forgot") {
    let forgotBody;

    if (resetSent) {
      forgotBody = (
        <p className="login-success">
          If an account exists for {email}, a password reset link has been sent.
        </p>
      );
    } else {
      forgotBody = (
        <form
          className="login-form"
          onSubmit={handleForgotSubmit}
          noValidate
        >
          {errorBanner}

          <div className="login-field">
            <label htmlFor="reset-email">Email</label>

            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="you@mybvc.ca"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button type="submit" className="login-submit">
            Send reset link
          </button>
        </form>
      );
    }

    return (
      <div className="login-page">
        <div className="login-card">
          <img
            className="login-logo"
            src="/bvc-logo.png"
            alt="BVC logo"
          />

          <h1 className="login-title">Forgot password?</h1>

          <p className="login-subtitle">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          {forgotBody}

          <button
            type="button"
            className="login-back"
            onClick={showLogin}
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          className="login-logo"
          src="/bvc-logo.png"
          alt="BVC logo"
        />

        <h1 className="login-title">BVC Portal</h1>

        <p className="login-subtitle">Sign in to your account</p>

        <div className="login-role">
          <p className="login-role-label">Select account type</p>

                    <div className="login-toggle" role="group" aria-label="Login as">
            <button
              type="button"
              className={
                role === "student"
                  ? "login-toggle-btn active"
                  : "login-toggle-btn"
              }
              aria-pressed={role === "student"}
              onClick={() => chooseRole("student")}
            >
              Student
            </button>

            <button
              type="button"
              className={
                role === "teacher"
                  ? "login-toggle-btn active"
                  : "login-toggle-btn"
              }
              aria-pressed={role === "teacher"}
              onClick={() => chooseRole("teacher")}
            >
              Teacher
            </button>

            <button
              type="button"
              className={
                role === "admin"
                  ? "login-toggle-btn active"
                  : "login-toggle-btn"
              }
              aria-pressed={role === "admin"}
              onClick={() => chooseRole("admin")}
            >
              Admin
            </button>
          </div>
        </div>

        <form
          className="login-form"
          onSubmit={handleLoginSubmit}
          noValidate
        >
          {errorBanner}

          <div className="login-field">
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder={ROLE_EMAIL_PLACEHOLDER[role]}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              className="login-forgot"
              onClick={showForgot}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}