import { useContext, createContext } from "react";

const Authcontext = createContext();

export function AuthProvider({ children, value }) {
    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
export function useAuthValue() {
    return useContext(Authcontext);
}