"use strict";
<<<<<<< HEAD
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
=======
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
>>>>>>> b993c392d3af055d07ec3aeaf037d32289d98384
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_connection_1 = require("./db/db_connection");
const user_route = require("../src/routes/user_routes");
const app = (0, express_1.default)();
<<<<<<< HEAD
const PORT = process.env.PORT || 4000;
=======
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(user_route);
>>>>>>> b993c392d3af055d07ec3aeaf037d32289d98384
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Nodemon!");
});
<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
=======
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${PORT}`);
    yield (0, db_connection_1.connectToDb)();
}));
>>>>>>> b993c392d3af055d07ec3aeaf037d32289d98384
