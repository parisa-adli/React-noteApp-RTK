import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../features/todo/todoSlice";

// const todos = [
//   { id: 1, title: "todo 1", completed: false },
//   { id: 2, title: "todo 2", completed: false },
// ];

function TodoList() {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);

  return (
    <div>
      <h2>TodoList</h2>
      {loading ? (
        <p>loading ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
