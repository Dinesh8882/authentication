const roleMiddleware = (roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user

            if (!roles.includes(role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                })
            }
            next()
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default roleMiddleware