import { useEffect } from "react";
// hooks
import { useLogin } from "components/contexts/LoginContextContainer";

export const Logout = () => {
  const { logout } = useLogin();
  
  useEffect(() => {
    logout();
    /* eslint-disable-next-line */
  }, []);

  return <div />;
};
