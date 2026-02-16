import { Note } from "../models/note.model.js";
import asyncHandler from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import mongoose from "mongoose";

const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        throw new ApiError(400, "Title or Content missing")
    }

    const note = await Note.create( // always throw error if fails, no null assignment. The error is catched directly by asyncHandler's .catch() and redirected to global error handler in app.js
        {
            title: title,
            content: content
        }
    )

    return res.status(201).json(
        new ApiResponse(201, note, "Note Created Successfully")
    )
})

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find()

    return res.status(200).json(
        new ApiResponse(200, notes, "All notes fetched successfully")
    )
})
const getNote = asyncHandler(async (req, res) => {
    const { note_id } = req.params

    if (!mongoose.isValidObjectId( note_id )) {
        throw new ApiError(400, "Invalid note id")
    }

    const note = await Note.findById( note_id )

    if (!note) {
        throw new ApiError(404, `Note with id: ${note_id} does not exists`)
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Successfully fetched")
    )
})
const updateNote = asyncHandler(async (req, res) => {
    const { note_id } = req.params
    const { title, content } = req.body

    if (!mongoose.isValidObjectId(note_id)) {
        throw new ApiError(400, "Invalid note id")
    }

    if (!title && !content) {
        throw new ApiError(400, "Please provide title or content to update")
    }

    const updated_note = await Note.findByIdAndUpdate(
        note_id,
        {
            $set: {
                ...(title && { title }),
                ...(content && { content })
            }
        },
        { new: true, runValidators: true }
    )

    if (!updated_note) {
        throw new ApiError(404, `Note with id: ${note_id} does not exists`)
    }

    return res.status(200).json(
        new ApiResponse(200, updated_note, "Note updated successfully")
    )
})
const deleteNote = asyncHandler(async (req, res) => {
    const { note_id } = req.params

    if (!mongoose.isValidObjectId( note_id )) {
        throw new ApiError(400, "Invalid note id")
    }

    const deleted_note = await Note.findByIdAndDelete( note_id )

    if (!deleted_note) {
        throw new ApiError(404, `Note with id: ${note_id} doesn't exists`)
    }

    res.status(200).json(
        new ApiResponse(200, deleted_note, "Note deleted successfully")
    )
})

export { createNote, getAllNotes, getNote, updateNote, deleteNote }