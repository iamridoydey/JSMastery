import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
const PRIVATE_KEY = "graphqljsonwebtoken";

export interface createUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface credentialPayload {
  email: string;
  password: string;
}

export class UserService {
  public static async createUser(payload: createUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    });
  }

  public static async findAllUsers() {
    return await prismaClient.user.findMany();
  }

  public static async login(payload: credentialPayload) {
    const { email: userEmail, password: userPassword } = payload;

    const user = await prismaClient.user.findFirst({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        salt: true,
      },
    });

    if (!user) return "";

    const hashedPassword = createHmac("sha256", user.salt)
      .update(userPassword)
      .digest("hex");

    if (hashedPassword !== user.password) return "";

    const { id, email, firstName, lastName } = user;

    const token = jwt.sign({ id, email, firstName, lastName }, PRIVATE_KEY);
    console.log("Token:", token);

    return token;
  }

  public static async verifyToken(token: string) {
    try {
      const user =  jwt.verify(token, PRIVATE_KEY);
      return user;
    } catch (error) {
      console.error("Invalid token:", error);
      return {};
    }
  }
}
