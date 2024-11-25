"use client";

import React, { useState } from "react";
import { Todo } from "../types";
import { useDispatch } from "react-redux";
import { toggleDone, deleteTodo } from "../store/slices/todosSlice";
import { AppDispatch } from "@/store";
import Modal from "../components/Modal";
import TodoClose from "../components/TodoClose";


interface TodoItemProps {
  todo: Todo;
  onClose: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo,onClose}) => {
  const dispatch: AppDispatch = useDispatch();
  const [modal,setModal]=useState(false);

  const handleToggle = () => {
    dispatch(toggleDone(todo.id!));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id!));
    onClose();
  };

  return (
    <div
      className={`p-4 border rounded shadow cursor-pointer ${
        todo.priority === "high"
          ? "border-red-500"
          : todo.priority === "medium"
          ? "border-yellow-500"
          : "border-green-500"
      }`}
    >
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <p className="text-sm">{todo.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span
          className={`px-2 py-1 rounded text-white ${
            todo.priority === "high"
              ? "bg-red-500"
              : todo.priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {todo.priority!.charAt(0).toUpperCase() + todo.priority!.slice(1)}
        </span>
        <div className="flex space-x-2">
          <button onClick={handleToggle} className="text-green-500">
            {todo.done ? "Undo" : "Done"}
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-900">
            Delete
          </button>
        </div>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
      <TodoClose onClose={onClose}/>
      </Modal>
    </div>
  );
};

export default TodoItem;
