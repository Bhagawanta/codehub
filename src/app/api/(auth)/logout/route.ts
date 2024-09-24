import { USER_TOKEN } from "@/lib/constant";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(resp: NextResponse) {
    try {
        cookies().set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 })
        return Response.json(
            {
                success: true,
                message: 'Logout success'
            },
            { status: 200 }
          );   
    } catch (error) {
        return Response.json(
            {
              message: 'Something went wrong!'
            },
            { status: 400 }
          );   
    }
}