import { httpClientMyagency } from "../httpClientMyagency";


export async function remove(userId: string) {
  const { data } = await httpClientMyagency.delete(`/users/${userId}`);

  return data;
}
