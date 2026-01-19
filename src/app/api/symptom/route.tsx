import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CreateSymptomBody = {
  name: string;
  categoryIds: string[];
};

// Get all symptoms
export async function GET() {
  const symptoms = await prisma.symptom.findMany();
  return NextResponse.json(symptoms);
}

// Create symptom + link to disease categories
export async function POST(req: Request) {
  const body: CreateSymptomBody = await req.json();
  const { name, categoryIds } = body;

  if (!name || !Array.isArray(categoryIds) || categoryIds.length === 0) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  // Create or reuse symptom (label is unique)
  const symptom = await prisma.symptom.upsert({
    where: { label: name },
    update: {},
    create: { label: name },
  });

  // Link symptom to disease categories (with default weight)
  await prisma.diseaseCategorySymptom.createMany({
    data: categoryIds.map(categoryId => ({
      diseaseCategoryId: categoryId,
      symptomId: symptom.id,
      weight: 1, // REQUIRED
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ success: true });
}
