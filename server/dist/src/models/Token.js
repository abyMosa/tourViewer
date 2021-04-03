"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var tokenSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", required: true, },
    token: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now, expires: 3600, },
});
exports.default = mongoose_1.default.model("Token", tokenSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL1Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBU2hDLElBQU0sV0FBVyxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDcEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxHQUFHO0lBQzVFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksR0FBRztJQUN4QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUc7Q0FDL0QsQ0FBQyxDQUFDO0FBR0gsa0JBQWUsa0JBQVEsQ0FBQyxLQUFLLENBQVMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=