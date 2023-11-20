import { useAppSelector } from "./redux";

export function useAuth() {
  const { id, email, token, is_login, nickname } = useAppSelector(
    (state) => state.userSlice
  );

  return {
    is_login,
    email,
    id,
    token,
    nickname,
  };
}
