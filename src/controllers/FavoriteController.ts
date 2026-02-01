import { Prisma } from "../generated/prisma/browser";
import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export class FavoriteController{

    public static async createFavorite(req: Request, res: Response) {
    
            try {
                const { userId, listingId} = req.params;
    
                const favoriteCreateInput: Prisma.FavoriteCreateInput = {
                    user: {
                        connect: {
                            userId: String(userId),
                        }
                    },
                    listing: {
                        connect: {
                            listingId: String(listingId),
                        }
                    }
    
                };
    
                const createdFavorite = await prisma.favorite.create({
                    data: favoriteCreateInput,
    
                });
                res.status(201).json(createdFavorite);
    
            } catch (error:any) {
                res.status(400).json({message: error.message});
            }
        }
    

    public static async readFavoritesByUser(req: Request, res: Response) {

        try {
            
            const { userId } = req.params;

            const userFavorites = await prisma.favorite.findMany({
                where: {
                    userId: String(userId)
                },
                select: {
                    createdAt: true,
                    listing: true
                }

            });

            res.status(200).json(userFavorites);

        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    public static async deleteFavorite(req: Request, res: Response) {
    
            try {
                const { userId, listingId } = req.params;
    
                const deletedFavorite = await prisma.favorite.delete({
                    where: {
                        userId_listingId: {
                            userId: String(userId),
                            listingId: String(listingId)
                        }
                    }
    
                });
                res.status(204).json(deletedFavorite);
    
            } catch (error:any) {
                res.status(404).json({message: error.message});
            }
        }


}