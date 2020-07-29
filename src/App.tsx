import React from "react";
import Router from "./router";
import { AppLayout } from "./components/Layout";

const App: React.FC = () => {
  return (
    <div>
      <AppLayout>
        <Router />
      </AppLayout>
    </div>
  );
};

export default App;
