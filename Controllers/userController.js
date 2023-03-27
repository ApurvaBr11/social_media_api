import userModal from "../Models/UserModal.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No Such User Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentAdminStatus, password } = req.body;
  if (id === currentUserId || currentAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await userModal.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("acess Denail");
  }
};

export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentAdminStatus } = req.body;

  if (id === currentUserId || currentAdminStatus) {
    try {
      await userModal.findByIdAndDelete(id);
      res.status(200).json("User Deleated");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("acess Denail");
  }
};

export const FollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await userModal.findById(id);
      const followingUser = await userModal.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following : id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await userModal.findById(id);
      const followingUser = await userModal.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following : id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is Already Unfollowed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
