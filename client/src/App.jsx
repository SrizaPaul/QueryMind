import { useEffect, useState } from "react";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteEmployee(id);

    fetchEmployees();
  } catch (error) {
    console.error("Failed to delete employee:", error);
  }
};

const handleEdit = (employee) => {
  setSelectedEmployee(employee);
};

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>QueryMind</h1>

      <EmployeeForm
  onEmployeeAdded={fetchEmployees}
  selectedEmployee={selectedEmployee}
  setSelectedEmployee={setSelectedEmployee}
/>

      <EmployeeList
  employees={employees}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
    </div>
  );
}

export default App;