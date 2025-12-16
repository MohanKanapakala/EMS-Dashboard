import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditEmployee.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://employee-management-dashboard-mock-api.onrender.com/employees/${id}`
      )
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to fetch employee!"));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.department || !form.salary) {
      toast.warn("All fields are required!");
      return;
    }
    axios
      .put(
        `https://employee-management-dashboard-mock-api.onrender.com/employees/${id}`,
        form
      )
      .then(() => {
        toast.success("Employee updated successfully!");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(() => toast.error("Failed to update employee!"));
  };

  return (
    <div className="edit-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit} className="edit-form">
        <h2>Edit Employee</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
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
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEmployee;
