import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()
app.use(express.json())
app.use(cors())

app.get("/pizza", async (request: Request, response: Response)=>{
    const pizzas = await prisma.pizza.findMany()
    return response.json(pizzas)
})
app.post("/pizza", async (request: Request, response: Response)=>{
    const {title, imageUrl, amount} = request.body
    const pizza = await prisma.pizza.create({
        data:{
            title,
            imageUrl,
            amount
        }
    })
    return response.json(pizza)
})
app.get("/pizza/:id", async (request: Request, response: Response)=>{
    const {id} = request.params
    const pizza = await prisma.pizza.findUnique({
        where:{
            id:Number(id)
        }
    })
    return response.json(pizza)
})
app.put("/pizza/:id", async (request: Request, response: Response)=>{
    const {id} = request.params
    const {title, imageUrl, amount} = request.body
    const pizza = await prisma.pizza.update({
        data:{
            title,
            imageUrl,
            amount
        },
        where:{
            id:Number(id)
        }
    })
    return response.json(pizza)
})
app.delete("/pizza/:id", async (request: Request, response: Response)=>{
    const {id} = request.params
    try{
        await prisma.pizza.delete({
            where:{
                id:Number(id)
            }
        })
        response.send("TASK DELETED")
    }
    catch(erro){
        response.send(erro)
    }
})


app.listen(3333, ()=> console.log("SERVER RUNNING... 🚀"))