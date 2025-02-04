import { Router } from 'express'
import { ProductsController } from '../http/controllers/products-controller'

const productsRoutes = Router()

productsRoutes.post('/', new ProductsController().create)
productsRoutes.get('/', new ProductsController().findAll)

export default productsRoutes
