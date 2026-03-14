import jwt from 'jsonwebtoken'
import userModel from '../models/user.models.js'

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_URL)
        const user = await userModel.findById(
            decoded.id
        )
        
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authMiddleware