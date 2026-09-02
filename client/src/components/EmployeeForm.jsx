import { useEffect, useState } from "react";

import {
  createEmployee,
  updateEmployee,
} from "../services/employeeService";

function EmployeeForm({
  onEmployeeAdded,
  selectedEmployee,
  setSelectedEmployee,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
        salary: selectedEmployee.salary,
      });
    }
  }, [selectedEmployee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedEmployee) {
        // Update existing employee
        await updateEmployee(selectedEmployee.id, formData);

        alert("Employee updated successfully!");

        setSelectedEmployee(null);
      } else {
        // Create new employee
        await createEmployee(formData);

        alert("Employee added successfully!");
      }

      await onEmployeeAdded();

      setFormData({
        name: "",
        email: "",
        department: "",
        salary: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        selectedEmployee
          ? "Failed to update employee."
          : "Failed to create employee."
      );
    }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);

    setFormData({
      name: "",
      email: "",
      department: "",
      salary: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {selectedEmployee ? "Update Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary (₹)"
          value={formData.salary}
          onChange={handleChange}
          min="1"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            {selectedEmployee ? "Update Employee" : "Add Employee"}
          </button>

          {selectedEmployee && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-slate-800 px-5 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;