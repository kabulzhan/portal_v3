import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/useAuth";
// import api from "../../services/api";

/**
 * TODO: не получается получить даныне о юзере в load data - не приходит инфа после записи в куки , хотя token виден
 переписать на понятный мне контекст 
 * @param } props 
 * @returns 
 */
function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUserData] = useState(null);
  const [token, setTokenData] = useState(null);
  const auth = useAuth();

  const setToken = useCallback((tokenData) => {
    console.log(tokenData, " in setToken");
    setTokenData(tokenData);

    if (tokenData) {
      // console.log(tokenData, "tokenData");
      Cookies.set("auth-token", tokenData);
    } else {
      Cookies.remove("auth-token");
    }
  }, []);

  // когда в форме логина получаем user и token, отправляем колбэк => все улетело в куки и контекст, становясь доступным всему приложению
  const setUser = useCallback((userData) => {
    // console.log("userData in set User  ", userData);

    setUserData(userData);

    if (userData) {
      Cookies.set("auth-user", userData);
      // console.log(" записали значение user auth ", userData);
    } else {
      Cookies.remove("auth-user");
    }
  }, []);

  const loadData = useCallback(async () => {
    // console.log(auth, "AuthProvider");
    const tokenData = Cookies.get("auth-token");
    const userData = Cookies.get("auth-user");

    // console.log(userData, tokenData, "userData in loadData ");
    // console.log(tokenData, "Cookies");
    // console.log(tokenData, "tokenData in privider ");
    setTokenData(tokenData);
    setUserData(userData);

    try {
      if (tokenData) {
        // в исходнике делается запрос на сервер для получения данных о зареганом пользователе по текущему token
        // const { data } = await api.auth.getProfile();
        // setUser(userData);
        // const { data } = await api.auth.getProfile();
        // console.log(token, auth, "loadData auth");
        const name = { firstName: "Петр", lastName: " Петров" };
        // // console.log(name, 'NAME');
        // console.log(auth, "AUTH");
        // setUser(data);
        setUser(name);
      }
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, [setToken, setUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken, setUser]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      token,
      setUser,
      setToken,
      logOut,
    }),
    [isLoaded, user, token, setToken, setUser, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
