import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        category: {
            required: true,
            type: String
        },
        image: {
            required: true,
            type: String
        },
        itemId: {
            ref: "MenuItem",
            required: true,
            type: mongoose.Schema.Types.ObjectId
        },
        lineTotal: {
            min: 0,
            required: true,
            type: Number
        },
        name: {
            required: true,
            type: String
        },
        price: {
            min: 0,
            required: true,
            type: Number
        },
        quantity: {
            min: 1,
            required: true,
            type: Number
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        items: {
            default: [],
            required: true,
            type: [orderItemSchema]
        },
        orderedAt: {
            default: Date.now,
            type: Date
        },
        status: {
            default: "pending",
            enum: ["pending", "completed"],
            type: String
        },
        total: {
            min: 0,
            required: true,
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
