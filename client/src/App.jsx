import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/health"
        );

        setMessage(response.data.message);
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