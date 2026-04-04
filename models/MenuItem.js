import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
    {
        category: {
            required: true,
            trim: true,
            type: String
        },
        description: {
            default: "",
            trim: true,
            type: String
        },
        image: {
            required: true,
            trim: true,
            type: String
        },
        name: {
            required: true,
            trim: true,
            type: String
        },
        prepTime: {
            default: "",
            trim: true,
            type: String
        },
        price: {
            min: 0,
            required: true,
            type: Number
        },
        rating: {
            default: "",
            trim: true,
            type: String
        },
        tag: {
            default: "",
            trim: true,
            type: String
        }
    },
    {
        timestamps: true
    }
);

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
