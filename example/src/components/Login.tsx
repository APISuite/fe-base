import React, { FC } from "react";
import { RouterState } from "@apisuite/fe-base";

export const Login: FC<RouterState> = () => {
  return (
    <div style={{ padding: 10 }}>
      <div>Login</div>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button onClick={() => history.back()}>close modal</button>
    </div>
  );
};
