import { TodoRepository } from "@/app/repository/todo/repository";

export async function DELETE(req: Request) {
  try {
    // Extract todoId from the request body
    const { todoId } = await req.json();

    // Validate input
    if (typeof todoId !== "number") {
      return new Response(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }

    // Delete the Todo
    const deletedTodo = await TodoRepository.deleteTodoById(todoId);

    // Return the deleted Todo
    return new Response(
      JSON.stringify({
        success: true,
        deletedTodo,
      })
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}
