import { Router } from "express";
// import all the controller funtions and attach them to specific routes
import { createNote, getAllNotes, getNote, updateNote, deleteNote } from "../controllers/notes.controller.js"

const router = Router()
// parent path: /api/v1/notes

router.route("/").get(getAllNotes).post(createNote) // fetch all notes, create note
router.route("/:note_id").get(getNote).patch(updateNote).delete(deleteNote) // fetch, patch, delete a specific note

export default router