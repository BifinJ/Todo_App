import { TodoRepository } from "@/app/repository/todo/repository";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, title, description, dueDate, priority } = await req.json();

    // Check if required fields are provided
    if (!id || !title || !dueDate || !priority) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the new Todo
    const newTodo = await TodoRepository.createTodo(
      id,
      title,
      description,
      new Date(dueDate),
      priority
    );

    return new Response(
      JSON.stringify({
        success: true,
        newTodo,
      })
    );
  } catch (error) {
    console.error("Error creating Todo:", error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}
