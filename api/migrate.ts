/**
 * One-time migration: copies data from old Left/Medium/Right collections
 * into the unified Item collection with a `col` field.
 *
 * Run with:  npx ts-node api/migrate.ts
 */
import { Item, Left, Medium, Right } from './Module/item.module';
import connectDB from './config';

async function migrate() {
    await connectDB();

    const existing = await Item.countDocuments();
    if (existing > 0) {
        console.log(`Item collection already has ${existing} documents — skipping migration.`);
        process.exit(0);
    }

    const [leftDocs, mediumDocs, rightDocs] = await Promise.all([
        Left.find().lean(),
        Medium.find().lean(),
        Right.find().lean(),
    ]);

    const allItems = [
        ...rightDocs.map((d: any, i: number) => ({ ...d, col: "Right", index: d.index ?? i + 1 })),
        ...mediumDocs.map((d: any, i: number) => ({ ...d, col: "Medium", index: d.index ?? i + 1 + rightDocs.length })),
        ...leftDocs.map((d: any, i: number) => ({ ...d, col: "Left", index: d.index ?? i + 1 + rightDocs.length + mediumDocs.length })),
    ];

    if (allItems.length === 0) {
        console.log("No data found in old collections. Nothing to migrate.");
        process.exit(0);
    }

    await Item.insertMany(allItems);
    console.log(`Migrated ${allItems.length} items (Right: ${rightDocs.length}, Medium: ${mediumDocs.length}, Left: ${leftDocs.length})`);
    process.exit(0);
}

migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
