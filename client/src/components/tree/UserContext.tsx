import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const StudentUserProvider = ({ children: any }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/students/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    return await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    user,
    loading,
    error,
    refreshUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default StudentUserProvider;
