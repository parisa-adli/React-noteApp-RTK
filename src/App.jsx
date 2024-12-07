import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
function App() {

  return (
  
      <div className="container pt-3">
        <h1 className="text-center">TodoApp with RTK</h1>
        <AddTodoForm />
        <TodoList />
      </div>

  );
}

export default App;
