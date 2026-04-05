import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        itemId: {
            ref: "MenuItem",
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            unique: true
        },
        quantity: {
            default: 1,
            min: 1,
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const CartItem = mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

export default CartItem;
