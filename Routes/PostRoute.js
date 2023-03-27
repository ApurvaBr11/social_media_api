import express  from "express";
import { CreatePost, DeletePost, GetPost, GetTimeLinePost, LikePost, UpdatePost } from "../Controllers/PostController.js";

const router = express.Router();

router.post('/',CreatePost)
router.get('/:id',GetPost)
router.put('/:id',UpdatePost)
router.delete('/:id',DeletePost)
router.put('/:id/like',LikePost)
router.get('/:id/timeline',GetTimeLinePost)

export default router