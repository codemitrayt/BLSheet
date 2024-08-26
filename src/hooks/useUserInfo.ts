import { useSelector } from "react-redux";
import { RootState } from "../store";

const useUserInfo = () => {
  const { authToken, user, isAuth } = useSelector(
    (state: RootState) => state.auth
  );
  return { user, authToken, isAuth };
};

export default useUserInfo;
