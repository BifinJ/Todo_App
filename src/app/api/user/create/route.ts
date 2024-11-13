import { UserRepository } from "@/app/repository/user/repository";

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();
    const user = await UserRepository.createUser(email, username);
    return new Response(
      JSON.stringify({
        success: true,
        user,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
}
