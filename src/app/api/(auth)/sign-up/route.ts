import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/Users";

import bcryptjs from 'bcryptjs'

export async function POST(request: Request) {
    try {
        dbConnect()
        
        const { mobile, username, pin } = await request.json()

        const userAlreadyExist = await UserModel.findOne({ mobile })

        if(userAlreadyExist) {
            return Response.json({
                success: false,
                message: "User already exist with this mobile number"
            }, { status: 400 })
        }

        const hashedPin = await bcryptjs.hash(pin, 10)

        const newUser = new UserModel({
            mobile,
            username,
            pin: hashedPin
        })

        await newUser.save()

        return Response.json({
            success: true,
            message: "User created successfully",
        }, { status: 200 })
        
    } catch (error) {
        console.error('error: ', error);
        return Response.json({
            success: false,
            message: "Error while creating user"
        },{ status: 400 })
    }
}