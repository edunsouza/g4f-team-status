export type UserStatus = {
  user: string;
  status: string;
  building: string;
};

export const search = async (db: D1Database) => {
  const query = `SELECT user, status, building FROM user_status`;
  const { results } = await db.prepare(query).all<UserStatus>();

  return results;
}

export const updateStatus = async (db: D1Database, user: string, status: string) => {
  const query = `
    UPDATE user_status
    SET status = ?2
    WHERE user = ?1
  `;
  await db.prepare(query).bind(user, status).run();
  return true;
};
