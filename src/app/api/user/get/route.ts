import { UserRepository } from "@/app/repository/user/repository";

export async function PUT(req: Request) {
  const { email } = await req.json();
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return new Response(
    JSON.stringify({
      success: true,
      user,
    })
  );
}
