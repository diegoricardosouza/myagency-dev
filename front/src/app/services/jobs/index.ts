import { countByType } from "./countByType";
import { create } from "./create";
import { getAll } from "./getAll";
import { getAllNoPagination } from "./getAllNoPagination";
import { getById } from "./getById";
import { remove } from "./remove";
import { sendApproved } from "./sendApproved";
import { update } from "./update";

export const jobsService = {
  getAll,
  create,
  remove,
  getById,
  update,
  getAllNoPagination,
  countByType,
  sendApproved
}
