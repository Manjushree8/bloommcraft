import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load token + profile when app starts
  useEffect(() => {
    const t = localStorage.getItem("bc_token");
    if (t) {
      fetchProfile(t);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      //  Flattened user object (easy access)
      setUser({
        token,
        ...res.data, // example: { id, name, email, role }
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem("bc_token", token);
    fetchProfile(token); // fetch fresh info
  };

  const logout = () => {
    localStorage.removeItem("bc_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
