import reset from "./reset";
import { Global } from "@emotion/react";

function App() {
  return (
    <div>
      <Global styles={reset} />
    </div>
  );
}

export default App;
