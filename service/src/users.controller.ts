import { WorkerContext } from './configs';
import { badRequestError, unknownError } from './helpers';
import * as usersRepo from './users.repo';

export const search = async (c: WorkerContext) => {
  try {
    const { DB } = c.env;
    const results = await usersRepo.search(DB);

    return c.json(results);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const update = async (c: WorkerContext) => {
  const { user } = c.req.param();
  const { status } = await c.req.json<{ status: string }>();

  if (!user) {
    return badRequestError(c, 'Usuário inválido');
  }

  try {
    const { DB } = c.env;
    await usersRepo.updateStatus(DB, user, status);
    const users = await usersRepo.search(DB);

    return c.json(users);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};