"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addTodo, updateTodo } from "../store/slices/todosSlice";
import { Todo } from "../types";
import { useForm, SubmitHandler } from "react-hook-form";

interface TodoFormProps {
  initialData?: Todo;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

const TodoForm: React.FC<TodoFormProps> = ({ initialData, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || "medium",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const todo: Todo = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      done: initialData?.done || false,
      id: initialData?.id,
      user: auth.user?.id,
    };

    if (initialData) {
      dispatch(updateTodo(todo));
    } else {
      dispatch(addTodo(todo));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Todo" : "Add Todo"}
      </h2>

      {/* Title Input */}
      <div>
        <input
          type="text"
          placeholder="Title"
          className={`border p-2 rounded w-full ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description Textarea */}
      <div>
        <textarea
          placeholder="Description"
          className={`border p-2 rounded w-full ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Priority Select */}
      <div>
        <select
          className={`border p-2 rounded w-full ${
            errors.priority ? "border-red-500" : "border-gray-300"
          }`}
          {...register("priority", { required: "Priority is required" })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
