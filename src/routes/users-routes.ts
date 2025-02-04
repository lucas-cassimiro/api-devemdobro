import { Router } from 'express'
import { UsersController } from '../http/controllers/users-controller'
import { authMiddleware } from '../middlewares/auth'

const usersRoutes = Router()

usersRoutes.post("/", new UsersController().create) // cadastra o usuário e gera o hash da senha
usersRoutes.post("/login", new UsersController().login) // faz o login e gera o token
usersRoutes.get("/profile", authMiddleware, new UsersController().profile) // retorna o perfil do usuário, se estiver autenticado

export default usersRoutes
