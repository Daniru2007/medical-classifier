import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:Request){
    const symptoms = await prisma.diseaseCategory.findMany();
    return NextResponse.json(symptoms);
}