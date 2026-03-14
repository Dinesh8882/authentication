import express from 'express'
import { login, logout, profileDetail, register, updateDetail, updatePassword } from '../controllers/user.controllers.js'
import authMiddleware from '../middlewares/auth.middlewares.js'

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.get("/profile", authMiddleware, profileDetail)
userRouter.put("/update",authMiddleware,updateDetail)
userRouter.put("/update/password",authMiddleware,updatePassword)

export default userRouter