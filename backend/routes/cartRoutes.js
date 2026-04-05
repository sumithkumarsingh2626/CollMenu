import { Router } from "express";
import {
    addCartItemHandler,
    deleteCartItemHandler,
    fetchCartItems,
    updateCartItemHandler
} from "../controllers/cartController.js";
import { validateCartPayload, validateCartQuantityUpdate } from "../middlewares/validate.js";

const router = Router();

router.get("/", fetchCartItems);
router.post("/", validateCartPayload, addCartItemHandler);
router.put("/:id", validateCartQuantityUpdate, updateCartItemHandler);
router.delete("/:id", deleteCartItemHandler);

export default router;
