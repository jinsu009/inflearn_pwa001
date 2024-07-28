import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { getClient } from "./queryClient";

const App = () => {
  const elem = useRoutes(routes);

  return { elem };
};

export default App;
