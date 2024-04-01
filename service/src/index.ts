import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { WorkerEnv } from './configs';
import * as usersController from './users.controller';

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
    const app = new Hono<{ Bindings: WorkerEnv }>();

    // MIDDLEWARES
    app.use('*', cors());
    // app.use('*', authMiddleware);

    // USERS
    app.get('/user_status', usersController.search);
    app.put('/user_status/:user', usersController.update);

    return app.fetch(request, env, ctx);
  },
};
