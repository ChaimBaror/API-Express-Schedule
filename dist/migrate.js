"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * One-time migration: copies data from old Left/Medium/Right collections
 * into the unified Item collection with a `col` field.
 *
 * Run with:  npx ts-node api/migrate.ts
 */
const item_module_1 = require("./Module/item.module");
const config_1 = __importDefault(require("./config"));
async function migrate() {
    await (0, config_1.default)();
    const existing = await item_module_1.Item.countDocuments();
    if (existing > 0) {
        console.log(`Item collection already has ${existing} documents — skipping migration.`);
        process.exit(0);
    }
    const [leftDocs, mediumDocs, rightDocs] = await Promise.all([
        item_module_1.Left.find().lean(),
        item_module_1.Medium.find().lean(),
        item_module_1.Right.find().lean(),
    ]);
    const allItems = [
        ...rightDocs.map((d, i) => { var _a; return (Object.assign(Object.assign({}, d), { col: "Right", index: (_a = d.index) !== null && _a !== void 0 ? _a : i + 1 })); }),
        ...mediumDocs.map((d, i) => { var _a; return (Object.assign(Object.assign({}, d), { col: "Medium", index: (_a = d.index) !== null && _a !== void 0 ? _a : i + 1 + rightDocs.length })); }),
        ...leftDocs.map((d, i) => { var _a; return (Object.assign(Object.assign({}, d), { col: "Left", index: (_a = d.index) !== null && _a !== void 0 ? _a : i + 1 + rightDocs.length + mediumDocs.length })); }),
    ];
    if (allItems.length === 0) {
        console.log("No data found in old collections. Nothing to migrate.");
        process.exit(0);
    }
    await item_module_1.Item.insertMany(allItems);
    console.log(`Migrated ${allItems.length} items (Right: ${rightDocs.length}, Medium: ${mediumDocs.length}, Left: ${leftDocs.length})`);
    process.exit(0);
}
migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
