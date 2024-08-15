import { NextResponse } from "next/server";

import Prisma from "../../../../prisma/client";

export async function GET() {
    const posts = await Prisma.post.findMany()

    return NextResponse.json(
        {
            sucess: true,
            message: "List Data Post",
            data: posts
    },
    {
        status: 200,
    }
)
}

export async function POST(request) {
    //get all request
    const { title, content} = await request.json();

    //create data post
    const post = await Prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    });
    return NextResponse.json({
        success: true,
        message: "Post created successfully!",
        data: post
    },
    {
        status: 201,
    }

)
}