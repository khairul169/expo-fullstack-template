import { router } from "../../trpc";
import { login } from "./login";
import { logout } from "./logout";
import { user } from "./user";

export const auth = router({
  login,
  logout,
  user,
});
