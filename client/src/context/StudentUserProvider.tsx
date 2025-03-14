import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the user data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;

  grade: number;

  // Sanabel
  snabelRed: number;
  snabelBlue: number;
  snabelYellow: number;

  xp: number;

  water: number;
  fertilizer: number;

  waterNeeded: number;
  fertilizerNeeded: number;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provide the context
// In UserProvider.jsx
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch user data
  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get("http://localhost:3000/students/data", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setUser({
          firstName: response.data.data.student.user.firstName,
          lastName: response.data.data.student.user.lastName,
          email: response.data.data.student.user.email,
          role: localStorage.getItem("role") || "",
          grade: response.data.data.student.grade,
          snabelRed: response.data.data.student.snabelRed,
          snabelBlue: response.data.data.student.snabelBlue,
          snabelYellow: response.data.data.student.snabelYellow,
          xp: response.data.data.student.xp,
          water: response.data.data.student.water,
          fertilizer: response.data.data.student.seeders,

          waterNeeded: response.data.data.treePoint.water,
          fertilizerNeeded: response.data.data.treePoint.seeders,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, refreshUserData: fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Update the context type
interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshUserData: (token?: string) => Promise<void>;
}

// Custom hook to use the UserContext
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
