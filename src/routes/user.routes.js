import express from 'express'
import {
    register,
    login,
    logout,
    profileDetail,
    updateDetail,
    updatePassword,
    getUsersData,
    deleteUserByAdmin,
    userDeleteByUser
} from '../controllers/user.controllers.js'
import authMiddleware from '../middlewares/auth.middlewares.js'
import roleMiddleware from '../middlewares/role.middlewares.js'

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.get("/profile", authMiddleware, profileDetail)
userRouter.put("/update", authMiddleware, updateDetail)
userRouter.put("/update/password", authMiddleware, updatePassword)
userRouter.get("/users", authMiddleware, roleMiddleware(['admin']), getUsersData)
userRouter.delete("/admin/:id", authMiddleware, roleMiddleware(['admin']), deleteUserByAdmin)
userRouter.delete("/delete-account/", authMiddleware, userDeleteByUser)


export default userRouter