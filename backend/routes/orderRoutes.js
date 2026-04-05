import { Router } from "express";
import { fetchOrderById, fetchOrders, placeOrderHandler } from "../controllers/orderController.js";

const router = Router();

router.post("/", placeOrderHandler);
router.get("/", fetchOrders);
router.get("/:id", fetchOrderById);

export default router;
