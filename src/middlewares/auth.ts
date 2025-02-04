import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/prisma'

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.headers['authorization']?.split(' ')[1]
    
        if (!token) {
            response.status(401).json({ message: 'Unauthorized' })
            return
        }
    
        const payload = jwt.verify(token, 'mysecretkey') as { id: number, email: string }
    
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
    
        if (!user) {
            response.status(401).json({ message: 'Unauthorized' })
            return
        }
    
        request.user = user
    
        next()
    } catch (error) {
        response.status(401).json({ message: 'Failed authenticate token' })
    }
}