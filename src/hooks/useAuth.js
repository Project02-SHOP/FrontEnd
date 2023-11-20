import { useAppSelector } from "./redux";

export function useAuth() {
  const { id, email, token, is_login } = useAppSelector(
    (state) => state.userSlice
  );

  return {
    isAuth: !!email, //이메일이 있으면 true가 됨
    is_login,
    email,
    id,
    token,
  };
}
