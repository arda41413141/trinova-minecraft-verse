
import { createContext } from "react";
import { AuthContextType } from "./types";

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
