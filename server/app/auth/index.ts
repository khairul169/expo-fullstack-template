import { router } from "../../trpc";
import { login } from "./login";
import { logout } from "./logout";

export const auth = router({
  login,
  logout,
});
