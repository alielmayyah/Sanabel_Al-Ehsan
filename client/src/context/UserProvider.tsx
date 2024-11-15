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
  role: string;
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
  const [firstName, setFirstName] = useState(""); // Local state for firstName
  const [lastName, setLastName] = useState(""); // Local state for lastName

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
          setFirstName(response.data.data.user.firstName);
          setLastName(response.data.data.user.lastName);
          setUser({
            firstName: response.data.data.user.firstName,
            lastName: response.data.data.user.lastName,
            role: localStorage.getItem("role") || "",
          });
          console.log(firstName);
          console.log(lastName);
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
