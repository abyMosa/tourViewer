"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./src/routes/routes"));
var app = express_1.default();
var port = 5000;
dotenv_1.default.config();
app.use(cors_1.default({ origin: "http://localhost:3000" }));
mongoose_1.default.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, function () { return console.log('db connected'); });
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () { return console.log("api is running on http://localhost:" + port); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE4QjtBQUM5QixrREFBNEI7QUFDNUIsOENBQXdCO0FBQ3hCLHNEQUFnQztBQUNoQywrREFBeUM7QUFJekMsSUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBQ3RCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRW5ELGtCQUFRLENBQUMsT0FBTyxDQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVyxFQUN2QixFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQ25ELGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUEzQixDQUEyQixDQUNwQyxDQUFDO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLENBQUM7QUFHaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXNDLElBQU0sQ0FBQyxFQUF6RCxDQUF5RCxDQUFDLENBQUMifQ==