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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

 const fetchEmployees = async () => {
  try {
    setLoading(true);

    const data = await getEmployees();

    setEmployees(data);
  } catch (error) {
    console.error("Failed to fetch employees:", error);
  } finally {
    setLoading(false);
  }
};

 const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmed) {
    return;
  }

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

  const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(searchTerm.toLowerCase())
);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>QueryMind</h1>

//       <EmployeeForm
//   onEmployeeAdded={fetchEmployees}
//   selectedEmployee={selectedEmployee}
//   setSelectedEmployee={setSelectedEmployee}
// />

//       <EmployeeList
//   employees={employees}
//   onDelete={handleDelete}
//   onEdit={handleEdit}
// />
//     </div>
//   );

return (
  <div className="min-h-screen bg-slate-100">
    <div className="max-w-7xl mx-auto p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          QueryMind
        </h1>

        <p className="text-slate-500 mt-2">
          Employee Management Dashboard
        </p>
      </div>
      <div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search employee by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <EmployeeForm
            onEmployeeAdded={fetchEmployees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>

        <div className="lg:col-span-2">
          <EmployeeList
  employees={filteredEmployees}
  loading={loading}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
        </div>

      </div>

    </div>
  </div>
);
}

export default App;