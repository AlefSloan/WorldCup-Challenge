import Router from '@koa/router';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const router = new Router();

router.get('/users', async ctx => {
  ctx.body = [];
})

router.post('/users', ctx => {
  const user = {
    username: ctx.request.body.username,
  }
  
  ctx.body = user;
})
