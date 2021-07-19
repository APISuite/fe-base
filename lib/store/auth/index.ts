import qs from "qs";
import { request } from "../../util/request";
import { createStoreModule } from "../types";
import { AUTH_EVENTS } from "./events";
import { AuthStore } from "./types";

const initialState: AuthStore = {
  working: false,
  error: null,
  profile: null,
  members: [],
  org: null,
  roleOptions: [],
};

export const auth: createStoreModule = (API_URL) => (store) => {
  store.on("@init", () => {
    return {
      auth: {...initialState},
    };
  });

  // Get initial authorization data from API
  store.on("@init", async () => {
    try {
      store.dispatch(AUTH_EVENTS.AUTH_WORK, true);

      const profile = await request(`${API_URL}/users/profile`);
      store.dispatch(AUTH_EVENTS.LOGIN_SUCCESS, { profile });
    } catch (error) {
      // no error needed to be handled, state is intact at this point
      store.dispatch(AUTH_EVENTS.AUTH_WORK, false);
    }
  });

  // Reset the state on logout
  store.on(AUTH_EVENTS.LOGOUT, () => {
    return {
      auth: {...initialState},
    };
  });

  // Flag network busy to help with UI intermittent state
  store.on(AUTH_EVENTS.AUTH_WORK, ({ auth }, working) => {
    return {
      auth: {
        ...auth,
        working,
      },
    };
  });

  // Request authorization and get profile data
  store.on(AUTH_EVENTS.LOGIN, async (_, data) => {
    try {
      store.dispatch(AUTH_EVENTS.AUTH_WORK, true);

      // hit the API so it sets a secure cookie for next requests authorization
      await request(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(data),
      });

      // get profile data
      const profile = await request(`${API_URL}/users/profile`);
      store.dispatch(AUTH_EVENTS.LOGIN_SUCCESS, { profile });
    } catch (error) {
      store.dispatch(AUTH_EVENTS.LOGIN_ERROR, error);
    }
  });

  // set user data
  store.on(AUTH_EVENTS.LOGIN_SUCCESS, ({ auth }, { profile }) => {
    return {
      auth: {
        ...auth,
        profile,
        working: false,
      },
    };
  });

  // handle login error
  store.on(AUTH_EVENTS.LOGIN_ERROR, ({ auth }, error) => {
    return {
      auth: {
        ...auth,
        error,
        working: false,
      },
    };
  });
};
