import { NextResponse } from "next/server";

type CourseProp={
    params:Promise<{
        courseId:string;
    }>
}

export async function GET(req:Request, {params}:CourseProp){
    const {courseId} = await params;
    return NextResponse.json({courseId});
}

export async function PUT(req:Request, {params}:CourseProp){
    const {courseId} = await params;
    const body = await req.json();
    const cont = req.headers.get("content-type");
    
    return NextResponse.json({courseId,body, cont});
}