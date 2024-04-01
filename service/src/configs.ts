import { Context, Env as HonoEnv } from 'hono';

export type WorkerEnv = {
  DB: D1Database
}

interface CustomEnv extends HonoEnv {
  Bindings: WorkerEnv
};

export type WorkerContext = Context<CustomEnv>;