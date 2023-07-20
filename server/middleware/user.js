import User from '../models/User.js'
import ResetToken from '../models/resetToken.js'
import { isValidObjectId } from "mongoose"
import {sendError} from "../controllers/utils/helper.js"

export const isResetTokenValid = async (req, res, next) => {
  const {token, id} = req.query
  if(!token || !id) return sendError(res, 'Invalid request!')

  if(!isValidObjectId(id)) return sendError(res, 'Invalid user!')

  const user = await User.findById(id)
  if(!user) return sendError(res, 'User not found')

  const resetToken = await ResetToken.findOne({owner: user._id})
  if(!resetToken) return sendError(res, 'Reset token not found!')

  const isValid = await resetToken.compareToken(token)
  if(!isValid) return sendError(res, 'Reset token is invalid')

  req.user = user
  next()
}