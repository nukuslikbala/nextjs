import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export const useUser = () => {
  const authContext = useContext(AuthContext);
  return authContext.user;
};

export const useSetUser = () => {
  const authContext = useContext(AuthContext);
  return authContext.setUser;
};

export const useLoggedInOrRiderect = () => {
  const user = useUser();
  const router = useRouter();
  const setUser = useSetUser();

  useEffect(() => {
    let isMounted = true;
    axios
      .get("/api/courses/")
      .then(function (response) {})
      .catch(function () {
        setUser(null);
      });
    if (user === null) {
      router.replace(`/?next=${router.asPath}`);
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  return user !== null;
};

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ user: undefined });

  const setUser = useCallback((user) => {
    setState({ user });
  }, []);

  const value = useMemo(() => ({ ...state, setUser }), [state]);

  useEffect(() => {
    axios
      .get("/api/session/")
      .then(function (response) {
        setState({ user: response.data });
      })
      .catch(function () {
        setState({ user: null });
      });
  }, []);

  if (state.user === undefined) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
