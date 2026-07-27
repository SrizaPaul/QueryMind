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

      await updateEmployee(selectedEmployee._id, formData);

      alert("Employee updated successfully!");

      setSelectedEmployee(null);

    } else {

      await createEmployee(formData);

      alert("Employee added successfully!");

    }

    onEmployeeAdded();

    setFormData({
      name: "",
      email: "",
      department: "",
      salary: "",
    });

  } catch (error) {
    console.error(error);
    alert("Operation failed.");
  }
};

  return (
    <div>
      <h2>
  {selectedEmployee ? "Update Employee" : "Add Employee"}
</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
  {selectedEmployee ? "Update Employee" : "Add Employee"}
</button>

{selectedEmployee && (
  <button
    type="button"
    onClick={() => {
      setSelectedEmployee(null);

      setFormData({
        name: "",
        email: "",
        department: "",
        salary: "",
      });
    }}
    style={{ marginLeft: "10px" }}
  >
    Cancel
  </button>
)}

      </form>
    </div>
  );
}

export default EmployeeForm;