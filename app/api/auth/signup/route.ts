import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(request:Request){

    try{
        const body = await request.json();
        const{username, email, password} =body;

        if(!username || !password || !email){
            console.log("input information error");
            return NextResponse.json({message:"Incompleted submitted information"},{status:400})
        }

        const user = await prisma.user.findUnique({
            where:{email:email.trim()}
        });

        if(user){
            return NextResponse.json({message:"Email has already sign up with other accoount"},{status:400})
        }

        const result= await prisma.user.create({
        data: {
            email: email ,
            username: username,
            password: password,
            },
        });

        return NextResponse.json({message:"sign up success"},{status:200})

    }catch(err){
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }
}