import { error } from "node:console";
import { Prisma } from "../generated/prisma/browser";
import { PrismaClient } from "../generated/prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export class ListingController{

    public static async createListing(req: Request, res: Response) {

        try {
            const { title, price, description, stock, authorId } = req.body;

            if (!authorId) {
                return res.status(400).json({error: 'Autor do anúncio não especificado'})
            }

            const author = await prisma.user.findUnique({
                where: { 
                    userId: authorId
                }
            });

            if (!author) {
                return res.status(404).json({error: 'Autor do anúncio não encontrado.'})
            }

            const listingCreateInput: Prisma.ListingCreateInput = {
                title: title,
                price: price, 
                description: description, 
                stock: stock, 

                author: {
                    connect: { 
                        userId: authorId 
                    }
                }
            };

            const createdListing = await prisma.listing.create({
                data: listingCreateInput,

            });
            
            res.status(201).json(createdListing);

        } catch (error:any) {
            res.status(400).json({message: error.message});
        }

    }

    public static async readListing(req: Request, res: Response) {
    
            try {
                
                const { listingId } = req.params;
    
                const foundListing = await prisma.listing.findUnique({
                    where: {
                        listingId: String(listingId)
                    },
                    
                    include: {
                        author: {
                            select: {
                                name: true,
                                cpfCnpj: true,
                                rating: true,

                            }
                        }
                    }
                });
    
                res.status(200).json(foundListing);
    
            } catch (error: any) {
                res.status(500).json({message: error.message});
            }
        }
    

    public static async readAllListings(req: Request, res: Response) {

        try {
            
            const { listingId } = req.params;

            const foundListings = await prisma.listing.findMany({
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true,
                            rating: true,
                        }
                    }
                }

            });

            res.status(200).json(foundListings);

        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

        public static async updateListing(req: Request, res: Response) {

        try {
            const { title, price, description, stock, status } = req.body;
            const { listingId } = req.params;

            const listingUpdateInput: Prisma.ListingUpdateInput = {
                title: title,
                price: price, 
                description: description, 
                stock: stock, 
                status: status,
            };

            const updatedListing = await prisma.listing.update({
                data: listingUpdateInput,
                where: {
                    listingId: String(listingId),
                }
            });

            res.status(201).json(updatedListing);
        } catch (error:any) {
            res.status(500).json({message: error.message});
        }

    }

    public static async deleteListing(req: Request, res: Response) {

        try {
            
            const { listingId } = req.params;

            const deletedListing = await prisma.listing.delete({
                where: {
                    listingId: String(listingId)
                },
            });

            res.status(204).json(deletedListing);

        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }


}