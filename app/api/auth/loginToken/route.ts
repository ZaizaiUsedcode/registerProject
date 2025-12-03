import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

export async function generateToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg }) // 设置 header: { alg: "HS256" }
    .setIssuedAt() // iat 签发时间
    .setExpirationTime("5h") // exp 过期时间：5 小时
    .sign(secretKey); // 用 secretKey 进行签名
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}