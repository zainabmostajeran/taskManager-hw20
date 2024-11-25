import pb from "./pocketbase";
import { Todo } from "../types";

const todosService = {
  getAllTodos: async (): Promise<Todo[]> => {
    const records = await pb.collection("todos").getFullList<Todo>(200, {
      filter: `user = "${pb.authStore.model?.id}"`,
      $autoCancel: false,
    });
    return records;
  },
  createTodo: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const record: Todo = await pb.collection("todos").create(todo);
    return record;
  },
  updateTodo: async (todo: Todo): Promise<Todo> => {
    const updatedRecord: Todo = await pb
      .collection("todos")
      .update(todo.id!, todo);
    return updatedRecord;
  },
  deleteTodo: async (id: string): Promise<void> => {
    await pb.collection("todos").delete(id);
  },
};

export default todosService;
