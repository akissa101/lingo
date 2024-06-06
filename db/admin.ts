import { auth } from '@clerk/nextjs/server';

const adminIds = [
  'user_2grzV45saBpK3V1785cS2g2FjKV', // KAREEMORBIT
  'user_2gs06kvRs3gvK2pW96kJDjJeZup', //KAREEMTECH
];

export const isAdmin = async () => {
  const { userId } = await auth();
  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
