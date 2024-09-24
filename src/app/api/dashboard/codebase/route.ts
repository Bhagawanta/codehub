import { COOKIE } from '@/lib/constant';
import dbConnect from '@/lib/dbConnect';
import { getUserIDFromToken } from '@/lib/jwt';
import CodeBaseModel from '@/models/Codebase';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  try {
    dbConnect();

    const { language_name, language_category, programe_name, programe_code } =
      await request.json();

    const newCodeBase = new CodeBaseModel({
      language_name,
      language_category,
      programe_name,
      programe_code,
      users: getUserIDFromToken(request.headers?.get(COOKIE))
    });

    const response = await newCodeBase.save();

    return Response.json(
      {
        success: true,
        message: 'Codebase created successfully',
        data: response
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('error: ', error);
    return Response.json(
      {
        success: false,
        message: 'Error while creating codebase'
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    dbConnect();
    const response = await CodeBaseModel.find({
      users: getUserIDFromToken(request.headers?.get(COOKIE))
    });
    return Response.json(
      {
        success: true,
        message: 'Codebase list',
        data: response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('error: ', error);
    return Response.json(
      {
        success: false,
        message: 'Error while getting codebase'
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const codeBaseId = searchParams.get('id');

    const response = await CodeBaseModel.findByIdAndDelete({ _id: codeBaseId });

    return Response.json(
      {
        success: true,
        message: 'Codebase deleted',
        data: response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('error: ', error);
    return Response.json(
      {
        success: false,
        message: 'Error while deleting codebase'
      },
      { status: 400 }
    );
  }
}