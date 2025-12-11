import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Signup.css";

function Signup() {

    // get signup() function from AuthContext
    const { signup } = useContext(AuthContext);

    // correct useNavigate
    const navigate = useNavigate();

    // states for input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. password match
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // 2. check for existing email
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.find(u => u.email === email);

        if (exists) {
            alert("Email already exists");
            return;
        }

        // 3. create new user object
        const newUser = {
            id: Date.now(),
            email,
            password,
        };

        // 4. save to localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // 5. LOGIN user in AuthContext
        signup(newUser);

        // 6. redirect to homepage
        navigate("/");
    };


    return (
  <div className="signup-container">
    <div className="signup-card">
      <h2>Create Account</h2>
      <p>Join SanCar Rentals today</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          className="signup-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <input
          className="signup-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          className="signup-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </form>

      <div className="signup-footer">
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  </div>
);
}

export default Signup;
