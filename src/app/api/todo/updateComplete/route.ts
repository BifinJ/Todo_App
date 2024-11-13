import { TodoRepository } from "@/app/repository/todo/repository";

export async function PUT(req: Request) {
  try {
    // Extract todoId and completed status from the request body
    const { todoId } = await req.json();
    console.log("in update complete", todoId);
    // Validate input
    if (typeof todoId !== "number") {
      return new Response(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }

    // Update the todo completion status
    const updatedTodo = await TodoRepository.updateTodoCompletion(todoId);

    // Return the updated Todo
    return new Response(
      JSON.stringify({
        success: true,
        updatedTodo,
      })
    );
  } catch (error) {
    console.error("Error updating todo completion:", error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}
