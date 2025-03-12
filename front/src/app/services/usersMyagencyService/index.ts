import { create } from "./create";
import { getAll } from "./getAll";
import { getAllNoPagination } from "./getAllNoPagination";
import { getById } from "./getById";
import { me } from "./me";
import { remove } from "./remove";
import { update } from "./update";

export const usersMyagencyService = {
  me,
  create,
  getAll,
  remove,
  getById,
  update,
  getAllNoPagination
}
