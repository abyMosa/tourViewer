"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourSchema = void 0;
var mongoose = __importStar(require("mongoose"));
exports.TourSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    image: { type: String },
    url: { type: String, required: true, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose.model("Tour", exports.TourSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG91ci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvVG91ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBVXhCLFFBQUEsVUFBVSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUc7SUFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUN2QixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUc7SUFDdEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUc7SUFDNUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtDQUMvQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxRQUFRLENBQUMsS0FBSyxDQUFRLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUMifQ==