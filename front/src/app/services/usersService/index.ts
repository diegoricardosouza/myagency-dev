import { create } from "./create";
import { getAll } from "./getAll";
import { getAllNoPagination } from "./getAllNoPagination";
import { getById } from "./getById";
import { me } from "./me";
import { myagency } from "./myagency";
import { remove } from "./remove";
import { update } from "./update";

export const usersService = {
  me,
  create,
  getAll,
  remove,
  getById,
  update,
  myagency,
  getAllNoPagination
}
