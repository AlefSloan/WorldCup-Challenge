import Router from '@koa/router';

export const router = new Router();

router.get('/', async ctx => {
  ctx.body = { ola: 'World' };
})

router.get('/users', async ctx => {
  ctx.body = { ola: 'Users' };
})
