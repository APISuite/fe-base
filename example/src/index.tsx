import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, history, Router } from "@apisuite/fe-base";


const App = () => {
  const DummyContent = () => (
    <div style={{ padding: 10 }}>
      <div>I&apos;m Content</div>
      <button onClick={() => history.push("/test")}>go to test</button>
    </div>
  );
  const TestContent = () => (
    <div style={{ padding: 10 }}>
      <div>I&apos;m test</div>
      <button onClick={() => history.back()}>go back</button>
    </div>
  );

  return (
    <ConfigProvider
      api={{ base: "https://api.proxy.apisuite.io" }}
      translations={{ "en-US": () => Promise.resolve({}) }}
    >
      <Router
        navigation={() => <div>top nav</div>}
        footer={() => <div>footer</div>}
        routes={{
          path: "",
          content: DummyContent,
          roles: [],
          subRoutes: [{
            path: "test",
            content: TestContent,
            roles: [],
          }],
        }}
      />
    </ConfigProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
