import bcrypt from "bcryptjs";
import { signJWT, verifyJWT } from "./jwt";

export { signJWT, verifyJWT };

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}
