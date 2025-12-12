import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILogin extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

const LoginSchema: Schema<ILogin> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
    },
    {
        timestamps: true,
        collection: "login",
    }
);

const Login: Model<ILogin> =
    (mongoose.models.Login as Model<ILogin>) || mongoose.model<ILogin>("Login", LoginSchema);

export default Login;
