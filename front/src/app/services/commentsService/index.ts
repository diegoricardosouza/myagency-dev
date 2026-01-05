import { create } from "./create";
import { getById } from "./getById";
import { remove } from "./remove";
import { removeFile } from "./removeFile";
import { update } from "./update";

export const commentsService = {
  create,
  getById,
  update,
  removeFile,
  remove
}
