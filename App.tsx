import AppNavigation from "./navigation/AppNavigation";
import React from "react";
import { AuthProvider } from "./factories/AuthProvider";

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
