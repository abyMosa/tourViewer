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
exports.UserSchema = exports.UserRole = void 0;
var mongoose = __importStar(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["Regular"] = "Regular";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    role: {
        type: String,
        required: true,
        default: UserRole.Regular
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    registered: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model("User", exports.UserSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBRXJDLElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNoQiwyQkFBZSxDQUFBO0lBQ2YsK0JBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBR25CO0FBc0JZLFFBQUEsVUFBVSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLEdBQUc7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxHQUFHLEVBQUUsQ0FBQztRQUNOLEdBQUcsRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsR0FBRztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztLQUM1QjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsRUFBRSxDQUFDO0tBQ1Q7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRztLQUNwQjtDQUNKLENBQUMsQ0FBQztBQUVILGtCQUFlLFFBQVEsQ0FBQyxLQUFLLENBQVEsTUFBTSxFQUFFLGtCQUFVLENBQUMsQ0FBQyJ9