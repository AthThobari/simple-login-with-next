import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { compare } from "bcryptjs";
const jwt = require("jsonwebtoken")

export async function POST(req) {
    const { email, password } = await req.json()
    const checkData = await prisma.user.findUnique({
        where: { email },
    })

    if (!checkData) {
        return NextResponse.json({
            message: "email or password not found!"
        }, {
            status: 422,
        }
        )
    }
    const comparePassword = await compare(password, checkData.password);
    if (!comparePassword) {
        return NextResponse.json({
            message: "your password is wrong",
        },
            {
                status: 422,
            },
        )
    }
    const token = jwt.sign({id: checkData.id, email: checkData.email, name: checkData.name}, process.env.JWT_SECRET_ENV)
    return NextResponse.json({
        message: "login successfully!",
        token,
    },{
        status: 200,
    })
}