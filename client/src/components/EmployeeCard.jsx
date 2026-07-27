function EmployeeCard({ employee, onDelete, onEdit }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{employee.name}</h3>

      <p>Email: {employee.email}</p>

      <p>Department: {employee.department}</p>

      <p>Salary: ₹{employee.salary}</p>

      <div style={{ marginTop: "10px" }}>
  <button
    onClick={() => onEdit(employee)}
    style={{ marginRight: "10px" }}
  >
    Edit
  </button>

  <button onClick={() => onDelete(employee._id)}>
    Delete
  </button>
</div>
    </div>
  );
}

export default EmployeeCard;