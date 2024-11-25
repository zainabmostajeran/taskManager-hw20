"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TodoItem from "../../components/TodoItem";
import Modal from "../../components/Modal";
import TodoForm from "../../components/TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchTodos } from "../../store/slices/todosSlice";
import ProtectedRoute from "../../components/ProtectedRoute";

const TodosPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const auth = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchTodos());
    }
  }, [auth.isAuthenticated, dispatch]);

  const highPriority = todos.filter(
    (todo) => todo.priority === "high" && !todo.done
  );
  const mediumPriority = todos.filter(
    (todo) => todo.priority === "medium" && !todo.done
  );
  const lowPriority = todos.filter(
    (todo) => todo.priority === "low" && !todo.done
  );

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todos</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:border border-green-500 hover:bg-white hover:text-gray-900"
          >
            Add Todo
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {todos.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {/* High Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-500">
                High Priority
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highPriority.length > 0
                  ? highPriority.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))
                  : [1, 2, 3].map((el) => {
                      return (
                        <div
                          key={el}
                          className="flex flex-col gap-2 shadow-lg  border border-red-500 p-10"
                        >
                          <p>Dont set any Todo....</p>
                        </div>
                      );
                    })}
              </div>
            </div>
            {/* Medium Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-yellow-500">
                Medium Priority
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediumPriority.length > 0
                  ? mediumPriority.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))
                  : [1, 2, 3].map((el) => {
                      return (
                        <div
                          key={el}
                          className="flex flex-col gap-2 shadow-lg  border border-yellow-500 p-10"
                        >
                          <p>Dont set any Todo...</p>
                        </div>
                      );
                    })}
              </div>
            </div>
            {/* Low Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-green-500">
                Low Priority
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowPriority.length > 0
                  ? lowPriority.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))
                  : [1, 2, 3].map((el) => {
                      return (
                        <div
                          key={el}
                          className="flex flex-col shadow-lg  gap-2 border border-green-500 p-10"
                        >
                          <p>Dont set any Todo...</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3>No todos available</h3>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TodoForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </ProtectedRoute>
  );
};

export default TodosPage;
