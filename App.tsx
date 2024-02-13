import AppNavigation from "./util/AppNavigation";
import React from "react";
import { AuthProvider } from "./service/AuthService";

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
