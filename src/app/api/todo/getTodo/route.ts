import { TodoRepository } from "@/app/repository/todo/repository";

export async function PUT(req: Request) {
  try {
    const { userId } = await req.json(); // Replace this with the actual userId from the session or authentication context

    // Get all Todos for the current user
    const todos = await TodoRepository.getTodosByUserId(userId);

    return new Response(
      JSON.stringify({
        success: true,
        todos,
      })
    );
  } catch (error) {
    console.error("Error fetching todos:", error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}
