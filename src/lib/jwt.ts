import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, decodeJwt } from 'jose'
import { User } from '@/models/Users';
import { NextRequest } from 'next/server';
import { USER_TOKEN, JWT_SECRET_KEY } from './constant';
import { nanoid } from 'nanoid';

const SECRET = new TextEncoder().encode(JWT_SECRET_KEY)

// Function to create JWT Web token
export const signJWT = async (user: User) => {
    const token = await new SignJWT({
      id: user?._id,
      isVerified: user?.isVerified
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET)

  return token;
};

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN)?.value

  if (!token) throw new Error('Missing user token')

  try {
    const verified = await jwtVerify(token,SECRET)
    return verified.payload
  } catch (err) {
    throw new Error('Your token has expired.')
  }
}


export const getToken = () => {
  const token = cookies().get(USER_TOKEN)?.value;
  return token
};

export const getUserIDFromToken = (cookie: string | null) => {
  const token = cookie?.split('=')[1]
  if(token) {
    const payload = decodeJwt(token)
    return payload?.id
  }
}
