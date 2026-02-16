import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/AsyncHandler.js"

const healthStatusCheck = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {}, "Api is healthy and running")
    )
})

export { healthStatusCheck }