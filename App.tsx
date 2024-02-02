import AppNavigation from "./navigation/AppNavigation";
import React from "react";
// import clientInstance from './config/rabbitmq/RabbitMqClient';

export default function App(): React.JSX.Element {
  // await clientInstance.initialize();
  return (
    <AppNavigation />
  );
}
