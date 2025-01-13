import { Action, UnauthorizedError } from "routing-controllers";

import { auth } from "../lib/auth.js";

export const authorizationChecker = async (action: Action) => {
  const session = await auth.api.getSession({
    headers: new Headers(action.request.headers),
  });

  if (!session) {
    throw new UnauthorizedError("Not authorized to access this resource");
  } else {
    return true;
  }
};
