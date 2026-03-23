import express from "express";
import {
    sendMessage,
    getMessages,
    markRead,
    deleteMessage,
    replyToMessage,
} from "../controllers/contactController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", sendMessage);
router.get("/messages", auth, getMessages);
router.patch("/messages/:id/read", auth, markRead);
router.delete("/messages/:id", auth, deleteMessage);
router.post("/messages/:id/reply", auth, replyToMessage);
export default router;
