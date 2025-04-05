import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { Pencil, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import SplashScreen from "./components/SplashScreen";


function App() {
  const [todo, changetodo] = useState("");
  const [todos, changetodos] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      changetodos(todos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (id) => {
    let ut = todos.filter((item) => item.id === id);
    changetodo(ut[0].todo);
    const updatedTodo = todos.filter((item) => item.id !== id);
    changetodos(updatedTodo);
  };

  const handleAdd = () => {
    if (todo.trim() === "") {
      Swal.fire({
        title: "Oops!",
        text: "Todo cannot be empty!",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    changetodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    changetodo("");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((item) => item.id !== id);
        changetodos(updatedTodos);
        Swal.fire({
          title: "Deleted!",
          text: "Your todo has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    changetodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );

    changetodos(updatedTodos);
  };

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <div>
      <Navbar />

      {/* Main Container */}
      <div className="container max-w-3xl md:mx-auto rounded-xl my-4 bg-blue-100 p-3 min-h-[80vh]">
        {/* Input Field and Button */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 ">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            placeholder="Enter your todo..."
            className="rounded-md w-full md:w-2/3 p-3 outline-none border-2 border-[#001A6E]"
          />
          <button
            onClick={handleAdd}
            className="rounded-md w-full md:w-1/4 bg-blue-400 p-3 cursor-pointer border-2 border-blue-400 hover:bg-blue-500 transition"
          >
            Add
          </button>
        </div>

        <h1 className="text-2xl text-[#4635B1] font-bold text-center">
          Your Todos
        </h1>

        {todos.length === 0 && (
          <div className="text-center text-xl text-cyan-600 font-medium mt-4">
            No todos to display
          </div>
        )}

        {/* Todo List */}
        <div className="mt-4 space-y-3 ">
          {todos
            .slice()
            .reverse()
            .map((item) => {
              return (
                <div key={item.id} className="flex items-center bg-blue-300 p-3 rounded-md shadow-md">
                  <input
                    onChange={handleCheckbox}
                    className="w-6 h-6 cursor-pointer accent-blue-600"
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                  />
                  <div
                    className={`ml-4 p-2 rounded-md flex-grow ${item.isCompleted ? "line-through opacity-50" : ""
                      }`}
                  >
                    {item.todo}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="rounded-md bg-blue-400 p-2 border-2 cursor-pointer border-blue-400 hover:bg-blue-500 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-md bg-red-400 p-2 border-2 cursor-pointer border-red-400 hover:bg-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
