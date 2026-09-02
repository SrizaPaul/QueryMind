import EmployeeCard from "./EmployeeCard";

function EmployeeList({
  employees,
  loading,
  onDelete,
  onEdit,
}) {
  if (loading) {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center">
      <h2 className="text-xl font-semibold text-blue-600">
        Loading employees...
      </h2>
    </div>
  );
}
  if (employees.length === 0) {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center">
      <h2 className="text-2xl font-semibold text-slate-700">
        No Employees Found
      </h2>

      <p className="text-slate-500 mt-2">
        Try adding a new employee or change your search.
      </p>
    </div>
  );
}
  return (
    <div>
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        employees.map((employee) => (
          <EmployeeCard
  key={employee.id}
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