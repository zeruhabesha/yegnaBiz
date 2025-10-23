// lib/auth-context.js
// Converted from TypeScript to JavaScript

import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} email
 * @property {string} fullName
 * @property {string} role
 */

/**
 * @typedef {object} AuthContextType
 * @property {User | null} user
 * @property {boolean} isLoading
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {(email: string, password: string, fullName: string) => Promise<void>} register
 * @property {() => void} logout
 */

/** @type {React.Context<AuthContextType | undefined>} */
const AuthContext = createContext(undefined);

/**
 * AuthProvider component to manage authentication state.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AuthProvider({ children }) {
  /** @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]} */
  const [user, setUser] = useState(null);
  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate it
    const token = localStorage.getItem("auth_token");
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  /**
   * Validates the given authentication token.
   * @param {string} token
   */
  const validateToken = async (token) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const normalizedFullName = data.user.fullName ?? data.user.full_name ?? '';
        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: normalizedFullName,
          role: data.user.role,
        });
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logs in a user with the given email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem("auth_token", data.token);
      const normalizedFullName = data.user.fullName ?? data.user.full_name ?? '';
      setUser({
        id: data.user.id,
        email: data.user.email,
        fullName: normalizedFullName,
        role: data.user.role,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  /**
   * Registers a new user.
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   * @returns {Promise<void>}
   */
  const register = async (email, password, fullName) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem("auth_token", data.token);
      const normalizedFullName = data.user.fullName ?? data.user.full_name ?? '';
      setUser({
        id: data.user.id,
        email: data.user.email,
        fullName: normalizedFullName,
        role: data.user.role,
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  /**
   * Logs out the current user.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    // Also call logout endpoint to clean up any server-side state
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'logout' }),
    }).catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the AuthContext.
 * @returns {AuthContextType}
 * @throws {Error} if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
