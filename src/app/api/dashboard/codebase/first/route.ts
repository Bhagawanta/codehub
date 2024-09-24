import { COOKIE } from "@/lib/constant"
import dbConnect from "@/lib/dbConnect"
import { getUserIDFromToken } from "@/lib/jwt"
import CodeBaseModel from "@/models/Codebase"

export async function GET(request: Request) {
    try {

        dbConnect()

        // TODO Get current userID from session or token
        const response = await CodeBaseModel.findOne({ users: getUserIDFromToken(request.headers.get(COOKIE)) })
        return Response.json({
            success: true,
            message: "First Programme Codebase",
            data: response
        },{ status: 200 })
    } catch (error) {
        console.error('error: ', error)
        return Response.json({
            success: false,
            message: "Error while getting codebase"
        },{ status: 400 })
    }
}