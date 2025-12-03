import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { generateToken } from "@/app/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request:Request){

    try{
        const body = await request.json();
        const{id, username,password,email} = body;

        if(!email || !password){
            return NextResponse.json(
                {message:"Email and password are required"},
                {status: 400}
            )
        }

        const user = await prisma.user.findFirst({
            where:{email:email.trim()}
        });

        if(!user){
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        //const match = await bcrypt.compare(password,user.password)
       const result = user.password

        if (password != user.password) {
            //console.log("DEBUG password:", password);
            //console.log("DEBUG result:", result);
            return NextResponse.json(
                { message: "Invalid email or password not match"},
                { status: 401 }
                
            );
        }

        const token = await generateToken({userId:user.id, email:user.email, username: user.username})


        const res= NextResponse.json(
        {
            message: "Login success",
            user: {
            email: user.email,
            username: user.username,
            },
        },
        { status: 200 }
        );

        res.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "lax",
            maxAge:60*60*2
        });

        return res
    }catch(err){
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }
}

