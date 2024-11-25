"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TodoItem from "../../components/TodoItem";
import Modal from "../../components/Modal";
import TodoForm from "../../components/TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchTodos } from "../../store/slices/todosSlice";
import ProtectedRoute from "../../components/ProtectedRoute";

const DonePage: React.FC = () => {
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

  const doneTodos = todos.filter((todo) => todo.done);
  const highPriority = doneTodos.filter((todo) => todo.priority === "high");
  const mediumPriority = doneTodos.filter((todo) => todo.priority === "medium");
  const lowPriority = doneTodos.filter((todo) => todo.priority === "low");

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Done</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {doneTodos.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {/* High Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2">High Priority</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highPriority.length > 0 ? (
                  highPriority.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-gray-500">
                    No high priority todos available.
                  </p>
                )}
              </div>
            </div>
            {/* Medium Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Medium Priority</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediumPriority.length > 0 ? (
                  mediumPriority.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-gray-500">
                    No medium priority todos available.
                  </p>
                )}
              </div>
            </div>
            {/* Low Priority */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Low Priority</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowPriority.length > 0 ? (
                  lowPriority.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-gray-500">
                    No low priority todos available.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3>No done todos available</h3>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TodoForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </ProtectedRoute>
  );
};

export default DonePage;
