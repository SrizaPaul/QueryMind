import EmployeeCard from "./EmployeeCard";

function EmployeeList({ employees, onDelete, onEdit }) {
  return (
    <div>
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        employees.map((employee) => (
          <EmployeeCard
  key={employee._id}
  employee={employee}
  onDelete={onDelete}
  onEdit={onEdit}
/>
        ))
      )}
    </div>
  );
}

export default EmployeeList;