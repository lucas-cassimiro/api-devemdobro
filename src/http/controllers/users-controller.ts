import { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import 'dotenv/config'

export class UsersController {
  async create(request: Request, response: Response) {
    const { email, firstName, lastName, password  } = request.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (user) {
            response.status(404).json({ error: 'User already exists' })
            return
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                passwordHash: hashedPassword
            }
        })
    
        response.status(201).json({ newUser, message: 'User created successfully' })
    } catch (error) {
        response.status(500).send({ message: 'Internal server error' })
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            const token = jwt.sign({ id: user.id, email: user.email }, "mysecretkey", { expiresIn: '1h' })
            response.json({ token })
        }

        response.status(401).json({ message: 'Invalid credentials' })
    } catch (error) {
        response.status(500).send({ message: 'Internal server error' })
    }
  }

  async profile(request: Request, response: Response) {
    response.json(request.user)
  }
}
