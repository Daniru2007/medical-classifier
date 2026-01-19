import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CreateSpecialistBody = {
  name: string;
  categoryIds: string[];
};

// GET all specialists with their disease categories
export async function GET() {
  const specialists = await prisma.specialist.findMany({
    include: {
      diseaseCategories: true,
    },
  });

  return NextResponse.json(specialists);
}

// Create a specialist and link disease categories
export async function POST(req: Request) {
  const body: CreateSpecialistBody = await req.json();
  const { name, categoryIds } = body;

  if (!name || !Array.isArray(categoryIds)) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const specialist = await prisma.specialist.create({
    data: {
      name,
      diseaseCategories: {
        connect: categoryIds.map(id => ({ id })),
      },
    },
    include: {
      diseaseCategories: true,
    },
  });

  return NextResponse.json(specialist);
}
