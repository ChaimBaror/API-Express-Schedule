/**
 * Create or promote the admin user.
 * Run with:  npx ts-node api/seed-admin.ts
 */
import { User } from './Module/User.module';
import connectDB from './config';

const ADMIN_EMAIL = 'chbaror@gmail.com';

async function seed() {
    await connectDB();

    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (user) {
        if (user.role === 'admin') {
            console.log(`${ADMIN_EMAIL} is already admin.`);
        } else {
            user.role = 'admin';
            await user.save();
            console.log(`${ADMIN_EMAIL} promoted to admin.`);
        }
    } else {
        user = await User.create({
            name: 'Chaim Baror',
            email: ADMIN_EMAIL,
            phone: '',
            role: 'admin',
            kehilaSlugs: [],
        });
        console.log(`Admin user created: ${ADMIN_EMAIL}`);
    }

    process.exit(0);
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
