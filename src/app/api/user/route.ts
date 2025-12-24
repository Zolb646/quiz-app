import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerkId = user.id;
  const email = user.emailAddresses[0]?.emailAddress ?? null;
  const name = user.fullName ?? null;

  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (existingUser) {
    return NextResponse.json({ ok: true });
  }

  await prisma.user.create({
    data: {
      clerkId,
      email,
      name,
    },
  });

  return NextResponse.json({ ok: true });
}
