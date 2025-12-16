import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployee.css";

function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    salary: "",
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://employee-management-dashboard-mock-api.onrender.com/employees"
      )
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.department || !form.salary) {
      toast.warn("All fields are required!");
      return;
    }

    const newId =
      employees.length > 0
        ? Math.max(...employees.map((emp) => Number(emp.id))) + 1
        : 1;

    const newEmployee = {
      id: String(newId),
      name: toTitleCase(form.name),
      role: toTitleCase(form.role),
      department: toTitleCase(form.department),
      salary: form.salary,
    };

    axios
      .post(
        "https://employee-management-dashboard-mock-api.onrender.com/employees",
        newEmployee
      )
      .then(() => {
        toast.success("Employee added successfully!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        toast.error("Failed to add employee!");
        console.error(err);
      });
  };

  return (
    <div className="add-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add Employee</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
        />
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
        </select>
        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEmployee;
