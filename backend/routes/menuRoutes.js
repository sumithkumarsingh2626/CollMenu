import { Router } from "express";
import {
    createMenuItemHandler,
    deleteMenuItemHandler,
    fetchMenuItemById,
    fetchMenuItems,
    updateMenuItemHandler
} from "../controllers/menuController.js";
import { validateMenuPayload } from "../middlewares/validate.js";

const router = Router();

router.get("/", fetchMenuItems);
router.get("/:id", fetchMenuItemById);
router.post("/", validateMenuPayload, createMenuItemHandler);
router.put("/:id", validateMenuPayload, updateMenuItemHandler);
router.delete("/:id", deleteMenuItemHandler);

export default router;
