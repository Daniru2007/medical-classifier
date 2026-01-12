import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CreateSpecialistBody = {
  name: string;
  categoryIds: string[];
};

export async function GET(req:Request){
    const symptoms = await prisma.specialist.findMany();
    return NextResponse.json(symptoms);
}

export async function POST(req:Request){
    const body:CreateSpecialistBody = await req.json();
    const {name, categoryIds} = body;
    const specialist = await prisma.specialist.create({
        data:{
            name,
            diseaseCategories:{
                connect: categoryIds.map((id:string)=>({id}))
            }
        }
    })
    return Response.json(specialist)
}