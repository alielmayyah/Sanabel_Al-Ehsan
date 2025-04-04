"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const db_connection_1 = require("./config/db_connection");
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
    },
};
const user_route = require("../src/routes/user_routes");
const student_route = require("../src/routes/student_routes");
const organization_routes = require("../src/routes/organization_routes");
const class_routes = require("../src/routes/class_routes");
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT;
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/users", user_route);
app.use("/students", student_route);
app.use("/organization", organization_routes);
app.use("/class", class_routes);
app.get("/", (req, res) => {
    res.send("welcome snable");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${PORT}`);
    yield (0, db_connection_1.connectToDb)();
}));
