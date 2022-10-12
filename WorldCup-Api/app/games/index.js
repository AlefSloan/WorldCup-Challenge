import { PrismaClient } from '@prisma/client';
import { addDays, formatISO } from 'date-fns';

const prisma = new PrismaClient();

export const list = async ctx => {
  const filterDate = ctx.request.query.gameTime;
  
  const where = filterDate ? {
    gameTime: {
      gte: filterDate,
      lt: formatISO(addDays(new Date(filterDate), 1))
    }
  } : {}
  
  try {
    const data = await prisma.game.findMany({ where });
    ctx.body = data;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}
