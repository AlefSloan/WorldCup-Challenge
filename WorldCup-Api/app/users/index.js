import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const list = async ctx => {
  try {
    const data = await prisma.user.findMany();
    ctx.body = data;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

export const login = async ctx => {
  const [type, token] = ctx.headers.authorization.split(' ');
  const [email, plainTextPassword]= Buffer.from(token, "base64").toString('utf-8').split(":");

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return ctx.status = 404;

  const validation = await bcrypt.compare(plainTextPassword, user.password)

  if (!validation) return ctx.status = 404;

  const { password, ...result } = user;
  
  const accessToken = jwt.sign({
    sub: user.id,
    name: user.username,
    expiresIn: '1d'
  }, process.env.JWT_SECRET)

  ctx.body = {
    user: result,
    accessToken
  };
}

export const create = async ctx => {
  const password = await bcrypt.hash(ctx.request.body.password, 10)
  
  const data = {
    name: ctx.request.body.name,
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password
  }

  try {
    const { password, createdAt, updatedAt, id, ...user } = await prisma.user.create({ data });
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}
