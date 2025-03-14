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
  seeders: number;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provide the context
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Context user state

  useEffect(() => {
    const token = localStorage.getItem("token");

    const handleFetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/students/data",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Properly formatted template literal
            },
          }
        );

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
            seeders: response.data.data.student.seeders,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      handleFetchData();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
