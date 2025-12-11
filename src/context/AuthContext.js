import { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context
const AuthContext = createContext();

// Provider component
function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => { const saved = localStorage.getItem("currentUser"); if (saved) setCurrentUser(JSON.parse(saved)); }, []);


    const login = (user) => { setCurrentUser(user); localStorage.setItem("currentUser", JSON.stringify(user)); }
    const logout = () => { setCurrentUser(null); localStorage.removeItem("currentUser"); }
    const signup = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  
  if (users.find(u => u.email === email)) {
    alert("Email already exists!");
    return false;
  }

  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  
  login(newUser); // auto-login after signup
  return true;
};


    return (
        <>
            <AuthContext.Provider value={{ currentUser, login, logout, signup }}>{children}</AuthContext.Provider>
        </>
    )
}

export { AuthContext, AuthProvider };