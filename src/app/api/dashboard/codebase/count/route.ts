import { COOKIE } from "@/lib/constant"
import dbConnect from "@/lib/dbConnect"
import { getUserIDFromToken } from "@/lib/jwt"
import CodeBaseModel from "@/models/Codebase"

export async function GET(request: Request) {
    try {

        dbConnect()
        // MongoDB aggregation to count based on language_name
        const result = await CodeBaseModel.aggregate([
            {
                $match: { users: getUserIDFromToken(request.headers?.get(COOKIE)) },  // Match only documents with the specific user ID
            },
            {
            $group: {
                _id: '$language_name',   // Group by language_name
                count: { $sum: 1 },      // Count the number of documents for each language_name
            },
            },
        ]);
        return Response.json({
            success: true,
            message: "Codebase count",
            data: result
        },{ status: 200 })
    } catch (error) {
        console.error('error: ', error)
        return Response.json({
            success: false,
            message: "Error while getting codebase"
        },{ status: 400 })
    }
}