import { useState, useEffect } from 'react';

import axios from 'axios';

import { CSVLink } from 'react-csv';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

function App() {

  const [query, setQuery] =
    useState('');

  const [data, setData] =
    useState([]);

  const [sql, setSql] =
    useState('');

  const [explanation, setExplanation] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState([]);

  const [file, setFile] =
    useState(null);

  const COLORS = [
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#2563eb',
    '#1d4ed8'
  ];

  // =========================
  // FETCH HISTORY
  // =========================

  const fetchHistory = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response =
        await axios.get(

          'http://localhost:3000/api/history',

          {
            headers: {
              Authorization: token
            }
          }

        );

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchHistory();

  }, []);

  // =========================
  // QUERY
  // =========================

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem('token');

      const response =
        await axios.post(

          // 'http://localhost:3000/api/query',
          'https://querymind-backend-i5jp.onrender.com/api/query',

          { query },

          {
            headers: {
              Authorization: token
            }
          }

        );

      setData(response.data.data);

      setSql(
        response.data.generatedSQL
      );

      setExplanation(
        response.data.explanation
      );

      fetchHistory();

    } catch (error) {

      console.error(error);

      alert('Query failed');

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // CSV UPLOAD
  // =========================

  const handleUpload = async () => {

    if (!file) {

      return alert(
        'Please select CSV'
      );

    }

    try {

      const token =
        localStorage.getItem('token');

      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      const response =
        await axios.post(

          'http://localhost:3000/api/upload',

          formData,

          {
            headers: {

              Authorization: token,

              'Content-Type':
                'multipart/form-data'

            }
          }

        );

      alert(response.data.message);

    } catch (error) {

      console.error(error);

      alert('Upload failed');

    }

  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem(
      'token'
    );

    window.location.href = '/';

  };

  // =========================
  // CHART DATA
  // =========================

  const chartData = data.map(
    (item) => ({

      name:
        item.category ||
        item.name ||
        'Unknown',

      amount:
        Number(item.amount) || 0

    })
  );

  // =========================
  // TOTALS
  // =========================

  const totalAmount =
    chartData.reduce(

      (acc, item) =>
        acc + item.amount,

      0

    );

  const totalRecords =
    data.length;

  const highestExpense =
    Math.max(

      ...chartData.map(
        (item) => item.amount
      ),

      0

    );

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">

      {/* SIDEBAR */}

      <div className="w-[300px] bg-black/30 border-r border-gray-800 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Query History
        </h2>

        <div className="space-y-4">

          {history.map((item, index) => (

            <div
              key={index}
              onClick={() =>
                setQuery(item.query)
              }
              className="bg-gray-900 hover:bg-gray-800 transition cursor-pointer p-4 rounded-xl"
            >

              <p className="text-sm text-gray-300">
                {item.query}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold">
              QueryMind
            </h1>

            <p className="text-gray-400 mt-2">
              Natural Language SQL Analytics
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* UPLOAD */}

        <div className="flex gap-4 items-center mb-8">

          <label className="bg-gray-900 hover:bg-gray-800 px-5 py-3 rounded-lg cursor-pointer">

            Select CSV

            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

          </label>

          {file && (

            <p className="text-gray-300">
              {file.name}
            </p>

          )}

          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg"
          >
            Upload CSV
          </button>

        </div>

        {/* QUERY */}

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Ask your query..."
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            className="flex-1 p-4 rounded-lg bg-white text-black outline-none"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg"
          >
            Ask
          </button>

        </div>

        {/* SUGGESTIONS */}

        <div className="flex flex-wrap gap-3 mb-8">

          <button
            onClick={() =>
              setQuery(
                'show top expenses'
              )
            }
            className="bg-gray-800 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Top Expenses
          </button>

          <button
            onClick={() =>
              setQuery(
                'show food expenses'
              )
            }
            className="bg-gray-800 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Food Expenses
          </button>

          <button
            onClick={() =>
              setQuery(
                'show total spending'
              )
            }
            className="bg-gray-800 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Total Spending
          </button>

        </div>

        {/* LOADING */}

        {loading && (

          <p className="text-blue-400 mb-6 animate-pulse">
            Loading...
          </p>

        )}

        {/* SQL */}

        {sql && (

          <div className="mb-8">

            <h2 className="text-2xl mb-3">
              Generated SQL
            </h2>

            <pre className="bg-gray-950 p-5 rounded-xl text-green-400 overflow-x-auto">
              {sql}
            </pre>

          </div>

        )}

        {/* EXPLANATION */}

        {explanation && (

          <div className="bg-gray-950 p-5 rounded-xl mb-8">

            <h2 className="text-2xl mb-3">
              Explanation
            </h2>

            <p className="text-gray-300">
              {explanation}
            </p>

          </div>

        )}

        {/* STATS */}

        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-950 p-6 rounded-2xl">

            <p className="text-gray-400">
              Total Amount
            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">
              ₹ {totalAmount}
            </h2>

          </div>

          <div className="bg-gray-950 p-6 rounded-2xl">

            <p className="text-gray-400">
              Total Records
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {totalRecords}
            </h2>

          </div>

          <div className="bg-gray-950 p-6 rounded-2xl">

            <p className="text-gray-400">
              Highest Expense
            </p>

            <h2 className="text-4xl font-bold text-pink-400 mt-3">
              ₹ {highestExpense}
            </h2>

          </div>

        </div>

        {/* BAR CHART */}

        {chartData.length > 0 && (

          <div className="bg-gray-950 rounded-xl p-6 h-[400px] mb-10">

            <h2 className="text-2xl mb-5">
              Expense Bar Chart
            </h2>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={chartData}>

                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                />

                <YAxis
                  stroke="#9ca3af"
                />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  radius={[10,10,0,0]}
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

        {/* PIE CHART */}

        {chartData.length > 0 && (

          <div className="bg-gray-950 rounded-xl p-6 h-[450px] mb-10">

            <h2 className="text-2xl mb-5">
              Expense Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="name"
                  outerRadius={140}
                  label
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )}

        {/* LINE CHART */}

        {chartData.length > 0 && (

          <div className="bg-gray-950 rounded-xl p-6 h-[400px] mb-10">

            <h2 className="text-2xl mb-5">
              Spending Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                />

                <YAxis
                  stroke="#9ca3af"
                />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        )}

        {/* RESULTS */}

        {data.length > 0 && (

          <div>

            <div className="flex justify-between mb-4">

              <h2 className="text-2xl">
                Results
              </h2>

              <CSVLink
                data={data}
                filename="query-results.csv"
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                Export CSV
              </CSVLink>

            </div>

            <table className="w-full overflow-hidden rounded-xl">

              <thead>

                <tr className="bg-gray-900">

                  {Object.keys(data[0]).map(
                    (key) => (

                      <th
                        key={key}
                        className="border border-gray-700 p-3 text-left"
                      >
                        {key}
                      </th>

                    )
                  )}

                </tr>

              </thead>

              <tbody>

                {data.map(
                  (row, index) => (

                    <tr key={index}>

                      {Object.values(row).map(
                        (value, i) => (

                          <td
                            key={i}
                            className="border border-gray-700 p-3"
                          >
                            {value?.toString()}
                          </td>

                        )
                      )}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;