function EmployeeCard({ employee, onDelete, onEdit }) {
  return (
  <div className="bg-white rounded-xl shadow-md p-5 mb-4 hover:shadow-xl transition">
    <h3 className="text-xl font-semibold text-slate-800">
      {employee.name}
    </h3>

    <p className="text-slate-600 mt-2">
      📧 {employee.email}
    </p>

    <p className="text-slate-600">
      🏢 {employee.department}
    </p>

    <p className="text-slate-800 font-medium mt-2">
      💰 ₹{employee.salary}
    </p>

    <div className="flex gap-3 mt-5">
      <button
        onClick={() => onEdit(employee)}
        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(employee._id)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  </div>
);
}

export default EmployeeCard;