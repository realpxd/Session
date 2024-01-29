const Users = require('../../models/Users.js')

const updateProfile = async(req,res)=>{
    try {
        const { name, phone } = req.body;
        // Extract user ID from the JWT token in the request header
        const userId = req.user.userId; // User ID added to request by the authenticateToken middleware
        await Users.updateOne({_id:userId},{name,phone})
        .then(({modifiedCount})=>{
            if (modifiedCount === 1) {
                res.status(200).json({ message: "Profile updated successfully" });
            } else {
                res.status(500).json({ message: "Error updating profile" });
            }
        })
    } catch (error) {
        res.status(500).json({error:"Server Internal Error"})   
    }
}
module.exports = updateProfile;