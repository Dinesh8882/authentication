import userModel from "../models/user.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body

        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Username or Password or role must importent!"
            })
        }

        const isUser = await userModel.findOne({
            username
        })

        if (isUser) {
            return res.status(400).json({
                success: false,
                message: "Not avilable!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userModel.create({
            username,
            password: hashedPassword,
            role
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_URL)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })

        res.status(201).json({
            success: true,
            message: "User created successfully!",
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(201).json({
            success: true,
            message: "User logout successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: false
        })
    }
}

const login = async (req, res) => {
    try {

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "username or passowrd is empty!"
            })
        }

        const user = await userModel.findOne({
            username
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist!"
            })
        }


        const isPasswordMetched = await bcrypt.compare(password, user.password)

        if (!isPasswordMetched) {
            return res.status(400).json({
                success: false,
                message: "username or password is wrong!"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_URL)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        })

        res.status(200).json({
            success: true,
            message: "user logged in successfully!"
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const profileDetail = async (req, res) => {
    try {

        const userId = req.user._id

        const user = await userModel.findById(
            userId
        ).select("-password")

        res.status(200).json({
            success: true,
            message: "fetched user data successfully!",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateDetail = async (req, res) => {
    try {
        const { username } = req.body
        const userId = req.user._id
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Feilds should not be empty!"
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { username },
            { new: true }
        ).select('-password')

        res.status(200).json({
            success: true,
            message: "Username updated successfully!",
            updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword && !newPassword) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized!"
            })
        }

        const user = await userModel.findById(req.user._id)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist!"
            })
        }

        const checkOldPassword = await bcrypt.compare(oldPassword, user.password)

        if (!checkOldPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password is incorrect!"
            })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated successfully!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error !"
        })
    }
}

const getUsersData = async (req, res) => {
    try {
        const users = await userModel.find({
            role: {
                $ne: "admin"
            }
        })
        res.send(users)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const userDelete = await userModel.findByIdAndDelete(id)

        if (!userDelete) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: `${userDelete.role} deleted successfully!`
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const userDeleteByUser = async (req, res) => {
    try {
        const { _id } = req.user
        await userModel.findByIdAndDelete(_id)
        res.clearCookie("token")


        res.status(200).json({
            success: true,
            message: "User deleted successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    register,
    login,
    logout,
    profileDetail,
    updateDetail,
    updatePassword,
    getUsersData,
    deleteUserByAdmin,
    userDeleteByUser
}