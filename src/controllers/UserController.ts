import { Prisma } from "../generated/prisma/browser";
import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export class UserController{

    public static async createUser(req: Request, res: Response) {

        try {
            const { name, cpfCnpj, password, email, phone } = req.body;

            const userCreateInput: Prisma.UserCreateInput = {
                name: name,
                cpfCnpj: cpfCnpj,
                password: password,
                email: email,
                phone: phone
            };

            const createdUser = await prisma.user.create({
                data: userCreateInput,
            });
            
            res.status(201).json(createdUser);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }

    }

    public static async readUser(req: Request, res: Response) {

        try {
            
            const { userId } = req.params;

            const foundUser = await prisma.user.findUnique({
                where: {
                    userId: String(userId)
                },

                select: {
                    userId: true,
                    name: true,
                    email: true,
                    cpfCnpj: true,
                    rating: true,
                    phone: true
                }

            });

            res.status(200).json(foundUser);

        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async readAllUsers(req: Request, res: Response) {

        try {
            
            const { userId } = req.params;

            const foundUsers = await prisma.user.findMany({
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    cpfCnpj: true,
                    rating: true,
                    phone: true
                }
            });

            res.status(200).json(foundUsers);

        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

        public static async updateUser(req: Request, res: Response) {

        try {
            const { name, email, phone } = req.body;
            const { userId } = req.params;

            const userUpdateInput: Prisma.UserUpdateInput = {
                name: name,
                email: email,
                phone: phone
            };

            const updatedUser = await prisma.user.update({
                data: userUpdateInput,
                where: {
                    userId: String(userId),
                }
            });
            
            res.status(201).json(updatedUser);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }

    }

    public static async deleteUser(req: Request, res: Response) {

        try {
            
            const { userId } = req.params;

            const deletedUser = await prisma.user.delete({
                where: {
                    userId: String(userId)
                },
            });

            res.status(204).json(deletedUser);

        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }


}