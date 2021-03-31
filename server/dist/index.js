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
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var port = 5000;
dotenv_1.default.config();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(cors_1.default({ origin: "http://localhost:3000" }));
mongoose_1.default.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, function () { return console.log('db connected'); });
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () { return console.log("api is running on http://localhost:" + port); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE4QjtBQUM5QixrREFBNEI7QUFDNUIsOENBQXdCO0FBQ3hCLHNEQUFnQztBQUNoQywrREFBeUM7QUFDekMsOENBQXdCO0FBR3hCLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV4RCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVuRCxrQkFBUSxDQUFDLE9BQU8sQ0FDWixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVcsRUFDdkIsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUNuRCxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBM0IsQ0FBMkIsQ0FDcEMsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO0FBR2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUFzQyxJQUFNLENBQUMsRUFBekQsQ0FBeUQsQ0FBQyxDQUFDIn0=