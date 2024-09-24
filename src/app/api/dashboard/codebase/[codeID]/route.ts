import { COOKIE } from "@/lib/constant"
import dbConnect from "@/lib/dbConnect"
import { getUserIDFromToken } from "@/lib/jwt"
import CodeBaseModel from "@/models/Codebase"

export async function GET(request: Request,{ params }: { params: { codeID: string } }) {
    try {
        dbConnect()
        const response = await CodeBaseModel.find({ users: getUserIDFromToken(request.headers?.get(COOKIE)), _id: params.codeID})
        return Response.json({
            success: true,
            message: "Codebase for a specific blog ",
            data: response
        },{ status: 200 })
    } catch (error) {
        console.error('error: ', error)
        return Response.json({
            success: false,
            message: "Error while getting codebase for blog"
        },{ status: 400 })
    }
}