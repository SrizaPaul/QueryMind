import { useEffect, useState } from "react";
import { getHealth } from "./services/healthService";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await getHealth();

        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage("Failed to connect to backend");
      }
    };

    fetchHealth();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
      }}
    >
      {message}
    </div>
  );
}

export default App;