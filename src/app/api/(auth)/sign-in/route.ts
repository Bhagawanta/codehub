import bcryptjs from 'bcryptjs';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/Users';
import { signJWT } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { USER_TOKEN } from '@/lib/constant';

export async function POST(request: Request) {
  try {
    dbConnect();

    const { mobile, pin } = await request.json();

    const userExistWithMobile = await UserModel.findOne({ mobile });

    if (!userExistWithMobile) {
      return Response.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      );
    } else {
      if (!userExistWithMobile.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'You are not verified user,Please contact admin'
          },
          { status: 404 }
        );
      } else {
        const isUserPinMatch = await bcryptjs.compare(
          pin,
          userExistWithMobile.pin
        );

        if (isUserPinMatch) {

          const userToken = await signJWT(userExistWithMobile);

          cookies().set(USER_TOKEN, userToken, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 2
          });
          
          return Response.json(
            {
              success: true,
              message: 'User sign in success',
              data: userExistWithMobile
            },
            { status: 200 }
          );
        } else
          return Response.json(
            {
              success: true,
              message: 'Incorrect Pin'
            },
            { status: 400 }
          );
      }
    }
  } catch (error) {
    console.error('error: ', error);
    return Response.json(
      {
        success: false,
        message: 'Error while sign-in user'
      },
      { status: 400 }
    );
  }
}
