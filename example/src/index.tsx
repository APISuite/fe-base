import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, history, Router, RouterState } from "@apisuite/fe-base";
import { Navigation } from "components/Navigation";
import { Login } from "components/Login";


const App = () => {
  const ExtensionHome = () => (
    <div style={{ padding: 10 }}>
      <div>I&apos;m Content</div>
      <button onClick={() => history.push("/settings")}>go to settings</button>
    </div>
  );

  const ExtensionSettings: FC<RouterState> = ({ router }) => (
    <div style={{ padding: 10 }}>
      {router.sideNavEntries.map((entry) => (
        <button
          style={{ color: entry.active ? "blue" : "black", display: "block", marginTop: 16 }}
          key={entry.to}
          onClick={() => history.push(entry.to)}
        >{entry.fallback}</button>)
      )}
    </div>
  );

  const ExtensionGeneral = () => (
    <div style={{ padding: 10 }}>
      <div>General Settings</div>
    </div>
  );

  const Profile = () => (
    <div style={{ padding: 10 }}>
      <div>Profile Settings</div>
      <button onClick={() => history.push("/settings/profile/modal")}>open modal</button>
    </div>
  );

  const ProfilePassword = () => (
    <div style={{ padding: 10 }}>
      <div>Change password</div>
    </div>
  );

  const ProfileModal = () => (
    <div style={{ padding: 10 }}>
      <div>I&apos;m a modal</div>
      <button onClick={() => history.back()}>close modal</button>
    </div>
  );

  return (
    <ConfigProvider
      api={{ base: "https://api.proxy.apisuite.io" }}
      translations={{ "en-US": () => Promise.resolve({}) }}
    >
      <Router
        Navigation={Navigation}
        Footer={() => <div>footer</div>}
        NotFound={() => <div>Not Found</div>}
        config={{
          "/": {
            contentType: "main",
            content: ExtensionHome,
            fallback: "",
            roles: [],
          },
          "/login": {
            contentType: "modal",
            content: Login,
            fallback: "",
            roles: [],
          },
          "/settings": {
            contentType: "navigation",
            content: ExtensionSettings,
            fallback: "",
            roles: [],
          },
          "/settings/general": {
            contentType: "main",
            content: ExtensionGeneral,
            fallback: "General Settings",
            roles: [],
          },
          "/settings/profile": {
            contentType: "main",
            content: Profile,
            fallback: "Profile",
            roles: [],
          },
          "/settings/profile/password": {
            contentType: "main",
            content: ProfilePassword,
            fallback: "Change password",
            roles: [],
          },
          "/settings/profile/modal": {
            contentType: "modal",
            content: ProfileModal,
            fallback: "",
            roles: [],
          },
        }}
      />
    </ConfigProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
