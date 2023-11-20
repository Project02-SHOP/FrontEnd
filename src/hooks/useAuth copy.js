import { useAppSelector } from "./redux";

export function useAuth() {
  const { id, email, token } = useAppSelector((state) => state.userSlice);

  return {
    isAuth: !!email, //이메일이 있으면 true가 됨
    email,
    id,
    token,
  };
}
