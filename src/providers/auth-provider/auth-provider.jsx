import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/auth-context/auth-context";

function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setTokenData] = useState(null);
  // const auth = useAuth();

  const setToken = useCallback((tokenData) => {
    setTokenData(tokenData);

    if (tokenData) {
      Cookies.set("auth-token", tokenData);
    } else {
      Cookies.remove("auth-token");
    }
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token");
    console.log(tokenData, "tokenData in privider ");
    setTokenData(tokenData);

    try {
      if (tokenData) {
        // const { data } = await api.auth.getProfile();
        const name = { firstName: "Петр", lastName: " Петров" };
        // console.log(name, 'NAME');
        // setUser(data);
        setUser(name);
      }
    } catch {
      setToken(null);
    } finally {
      setIsLoaded(true);
    }
  }, [setToken]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      token,
      setUser,
      setToken,
      logOut,
    }),
    [isLoaded, user, token, setToken, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
