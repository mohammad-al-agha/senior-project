"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Test Test");
});
app.get("/hiii", (req, res) => {
    res.send("Hii Test Test");
});
app.listen(process.env.PORT, () => {
    //   if (e) console.error(e.message);
    console.log(`Server Running on Port ${process.env.PORT}`);
    //   require("./configs/db.configs");
});
