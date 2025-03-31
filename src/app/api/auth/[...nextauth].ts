import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email: {label: "Email", type: "text", placeholder: "Email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: Record<string, string> | undefined){
                if(!credentials || !credentials.email || !credentials.password){
                    throw new Error("Please enter your credentials");
                }

                const user = await prisma.user.findUnique({where: {email: credentials.email}});
                if(!user || !bcrypt.compareSync(credentials.password, user.password)){
                    throw new Error("Email or Password is incorrect");
                }

                return {id: user.id, email: user.email, name: user.name}
            }
        })
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
})