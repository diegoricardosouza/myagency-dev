import { create } from "./create";
import { getAll } from "./getAll";
import { getAllNoPagination } from "./getAllNoPagination";
import { getById } from "./getById";
import { remove } from "./remove";
import { update } from "./update";

export const projectsService = {
  getAll,
  getAllNoPagination,
  remove,
  create,
  getById,
  update
}
