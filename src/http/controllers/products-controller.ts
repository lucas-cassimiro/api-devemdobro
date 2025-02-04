import { Request, Response } from 'express'

import { prisma } from '../../prisma/prisma'

// MVC - MODEL / VIEW / CONTROLLER

export class ProductsController {
    async findAll(_request: Request, response: Response) {
        try {
            const products = await prisma.product.findMany()
            response.send(products)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async create(request: Request, response: Response) {
        const { name, price, discount, description, colorId, categoryId, sizeId, highlight, ean } = request.body

        const productExistentInDatabase = await prisma.product.findUnique({
            where: {
                ean
            }
        })

        if (productExistentInDatabase) return response.status(409).send({ message: '❌ Produto já cadastrado no sistema.' })

        const product = await prisma.product.create({
            data: {
                name,
                price,
                image,
                discount,
                description,
                colorId,
                categoryId,
                sizeId,
                highlight,
                ean
            }
        })

        return product

    }

    async update() {

    }

    async destroy() {

    }
}
