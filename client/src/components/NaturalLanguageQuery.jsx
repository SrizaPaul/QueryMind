import { useState } from "react";
import axios from "axios";

function NaturalLanguageQuery() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (event) => {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/api/ai-query",
        {
          question,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Query failed:", error);

      setResult({
  success: false,
  message:
    error.response?.data?.message ||
    "Failed to process your query.",
});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Ask QueryMind
      </h2>

      <p className="text-slate-500 mb-5">
        Ask questions about your employees in plain English.
      </p>

      <form onSubmit={handleQuery} className="flex gap-3">
        <input
          type="text"
          placeholder="e.g. Show employees earning more than 70000"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <div className="mt-4">
  <p className="text-sm text-slate-500 mb-2">
    Try asking:
  </p>

  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onClick={() => setQuestion("Show all employees")}
      className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition"
    >
      Show all employees
    </button>

    <button
      type="button"
      onClick={() =>
        setQuestion("Show employees earning more than 70000")
      }
      className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition"
    >
      Employees earning more than 70000
    </button>

    <button
      type="button"
      onClick={() => setQuestion("What is the average salary?")}
      className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition"
    >
      Average salary
    </button>
  </div>
</div>

      {result && (
        <div className="mt-6">
          {result.success ? (
            <>
              {/* Generated SQL */}
              <div className="bg-slate-100 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-slate-600 mb-2">
                  Generated SQL
                </p>

                <code className="text-sm text-slate-800">
                  {result.sql}
                </code>
              </div>

              {/* Results */}
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Results ({result.data.length})
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-left">
                        {result.data.length > 0 &&
                          Object.keys(result.data[0]).map((column) => (
                            <th
                              key={column}
                              className="p-3 border-b capitalize"
                            >
                              {column.replace(/_/g, " ")}
                            </th>
                          ))}
                      </tr>
                    </thead>

                    <tbody>
                      {result.data.length > 0 ? (
                        result.data.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-slate-50"
                          >
                            {Object.values(row).map(
                              (value, columnIndex) => (
                                <td
                                  key={columnIndex}
                                  className="p-3 border-b"
                                >
                                  {value}
                                </td>
                              )
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="100%"
                            className="p-6 text-center text-slate-500"
                          >
                            No employees found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <p className="text-red-600">
              {result.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default NaturalLanguageQuery;