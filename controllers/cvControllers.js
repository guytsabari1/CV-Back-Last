
const User = require('../models/user');
const CV = require('../models/cv');
const jwt = require("jsonwebtoken");

exports.GetCVs = async (req, res) => {
  
  try {
    const usersId = jwt.verify(req.body.token,process.env.SECRET)
      const getcvs = await User.findById({_id:usersId.id})
      return res.status(200).json(getcvs.cvs)
      
  } catch (err) {
      res.status(500).json(err.message)
  }
};

exports.CreateCV = async (req, res) => {
  try {
    const usersId = jwt.verify(req.body.token,process.env.SECRET)
    const wanteduser = await User.findById({_id:usersId.id})
    const newCV = await CV.create(req.body);
    const updateUser = await User.findOneAndUpdate(
      { _id: wanteduser.id },
      { $push: { cvs: newCV._id } },
      { new: true }
    );

    return res.status(200).json(updateUser);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.RemoveCV = async (req, res) => {
  try {
    const userId = jwt.verify(req.body.token, process.env.SECRET);
    const user = await User.findById(userId.id);
    const removedCV = await CV.findByIdAndDelete(req.body.id);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { $pull: { cvs: req.body.id } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the CV" });
  }
};