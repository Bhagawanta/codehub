import { NextRequest } from "next/server";

export async function GET() {
  return Response.json(
    {
      message: 'Health is Good'
    },
    { status: 200 }
  );
}