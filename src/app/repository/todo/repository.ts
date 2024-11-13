import prisma from "../../../../lib/prisma_config";

export class TodoRepository {
  // Function to create a Todo
  static async createTodo(
    id: number,
    title: string,
    description: string | null,
    dueDate: Date,
    priority: string
  ) {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        userId: id, // Associates the Todo with the user's ID
        completed: false, // Default value for completed
      },
    });
    return todo;
  }

  // Function to get all Todos for a specific user
  static async getTodosByUserId(userId: number) {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId: userId, // Filter todos by userId
        },
        orderBy: {
          createdAt: "desc", // Optional: Order todos by creation date (most recent first)
        },
        select: {
          id: true,
          title: true,
          description: true,
          dueDate: true,
          priority: true,
          completed: true,
        },
      });
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw new Error("Failed to fetch todos");
    }
  }

  // Function to update a Todo's completed status
  static async updateTodoCompletion(todoId: number) {
    try {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: todoId, // Identify the Todo by its ID
        },
        data: {
          completed: true, // Set the 'completed' status
        },
      });
      return updatedTodo;
    } catch (error) {
      console.error("Error updating todo completion:", error);
      throw new Error("Failed to update todo");
    }
  }

  // Function to delete a Todo by its ID
  static async deleteTodoById(todoId: number) {
    try {
      const deletedTodo = await prisma.todo.delete({
        where: {
          id: todoId, // Identify the Todo by its ID
        },
      });
      return deletedTodo;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw new Error("Failed to delete todo");
    }
  }
}
