import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo, addTodo } from "../features/todo/todoSlice";

function AddTodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    dispatch(addAsyncTodo({ title: value }));
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form-inline mt-3 mb-4 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        type="text"
        id="name"
        autoComplete="off"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo ... "
        onChange={(e) => setValue(e.target.value)}
      />
      <button disabled={loading} type="submit" className="btn btn-primary mt-2">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default AddTodoForm;
