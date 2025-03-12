import { httpClientArts } from "../httpClientArts";


export async function remove(userId: string) {
  const { data } = await httpClientArts.delete(`/users/${userId}`);

  return data;
}
