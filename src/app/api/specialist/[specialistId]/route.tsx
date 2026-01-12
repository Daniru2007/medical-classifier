import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CourseProp={
    params:Promise<{
        specialistId:string;
    }>
}

export async function GET(req:Request, {params}:CourseProp){
    const {specialistId} = await params;
    const specialist = await prisma.specialist.findUnique({where:{id:specialistId}});
    
    return NextResponse.json(specialist);
}