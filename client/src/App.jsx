import { useEffect, useState } from "react";
import { getEmployees } from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>QueryMind</h1>

      <h2>Employees</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              <strong>{employee.name}</strong> - {employee.department} - ₹
              {employee.salary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;