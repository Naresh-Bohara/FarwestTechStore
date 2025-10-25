import { createContext, useEffect, useState } from "react";
import authSvc from "../../pages/auth/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedInUser: null,
  });
  const [loading, setLoading] = useState(true); // track loading state

  const getLoggedInUser = async () => {
    try {
      const response = await authSvc.getLoggedInUserDetail();
      setAuth({
        loggedInUser: response.data,
      });
    } catch (exception) {
      setAuth({ loggedInUser: null });
    } finally {
      setLoading(false); // stop loading after API call
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token") || null;
    if (token) {
      getLoggedInUser();
    } else {
      setLoading(false); // no token, stop loading immediately
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
