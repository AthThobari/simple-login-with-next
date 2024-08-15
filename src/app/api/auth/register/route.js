import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

const bcrypt = require("bcryptjs")


export async function POST(req) {
    const { name, email, password} = await req.json()

    const validateEmail = await prisma.user.findUnique({ where: {
        email
     }})
    if(validateEmail) {
        return NextResponse.json({message: "Email already exist!"})
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const resAdd = await prisma.user.create({data: {
        name,
        email,
        password: hashPassword,
    }});
    return NextResponse.json({
        message: "register data successfully!",
        data: resAdd,
    })
}