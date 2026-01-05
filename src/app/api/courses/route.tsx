import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as z from "zod";

const Player = z.object({
    username: z.string(),
    xp: z.number()
});

export async function GET(req:Request){
    const courses = await prisma.course.findMany();
    try{
        Player.parse({username: "daniru", xp: 42});
    }catch(error){
        return NextResponse.json({...courses, fk:false });
    }
    return NextResponse.json({...courses, fk:true });
}