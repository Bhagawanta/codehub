import { COOKIE } from "@/lib/constant";
import dbConnect from "@/lib/dbConnect";
import { getUserIDFromToken } from "@/lib/jwt";
import UserModel from "@/models/Users";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {

        dbConnect();

        const response = await UserModel.find({ _id: getUserIDFromToken(request.headers?.get(COOKIE))})

        return NextResponse.json({
            success: true,
            message: "GET user success",
            data: response?.[0].username
        },{ status: 200 })

    } catch (error) {
        console.error('error: ', error)
        return NextResponse.json({
            success: false,
            message: "Error while creating user"
        },{ status: 400 })
    }
}