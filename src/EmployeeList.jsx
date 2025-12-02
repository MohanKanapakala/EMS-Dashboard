import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EmployeeList.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const API_URL = "http://localhost:3001/employees";

  function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortField, setSortField] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Fetch employees
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  const departments = Array.from(
    new Set(employees.map((e) => e.department))
  ).filter(Boolean);

  
  const filteredEmployees = employees
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) =>
      departmentFilter ? e.department === departmentFilter : true
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "name") return a.name.localeCompare(b.name);
      if (sortField === "salary") return a.salary - b.salary;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize) || 1;
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

 
  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
        axios.delete(`${API_URL}/${id}`)
            .then(() => toast("Employee removed sucessfully!"))
             .then(() => {
                 setEmployees(employees.filter((e) => e.id !== id))
                     ;
      });
    }
  };

  return (
      <div className="employee-container">
          <ToastContainer autoClose={2000} position="top-right"/>  
      <h1>Employee Management Dashboard</h1>

      <Link to="/add" className="add-btn">
        Add Employee
      </Link>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="salary">Salary</option>
        </select>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <Link to={`/edit/${emp.id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active-page" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
export default EmployeeList;
