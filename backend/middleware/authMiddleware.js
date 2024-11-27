const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || user.role !== "Admin") {
            return res.status(403).json({ error: "Not authorized" });
        }

        req.admin = user; // Attach admin to the request object
        next();
    } catch (err) {
        res.status(401).json({ error: "Not authorized" });
    }
};

module.exports = authMiddleware;
