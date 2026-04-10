import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../Module/User.module';

// Admins defined in env — auto-promoted on every login
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'ch.baror@gmail.com').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

type Role = 'admin' | 'gabay' | 'user';

function resolveRole(email: string, currentRole?: string): Role {
    if (ADMIN_EMAILS.includes(email.toLowerCase())) return 'admin';
    return (currentRole as Role) || 'user';
}

/**
 * POST /auth/register
 * Register a new user with email + password + phone
 */
export const register = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'name, email, password, phone are required' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = resolveRole(email);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * POST /auth/login
 * Login with email + password → returns user object
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Auto-promote if in ADMIN_EMAILS
        const correctRole = resolveRole(email, user.role);
        if (user.role !== correctRole) {
            user.role = correctRole;
            await user.save();
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * POST /auth/google
 * Called by NextAuth on Google sign-in → create or find user
 */
export const googleAuth = async (req: Request, res: Response) => {
    const { name, email, googleId, phone } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'email is required' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            let changed = false;
            if (!user.googleId && googleId) { user.googleId = googleId; changed = true; }
            // Auto-promote if in ADMIN_EMAILS
            const correctRole = resolveRole(email, user.role);
            if (user.role !== correctRole) { user.role = correctRole; changed = true; }
            if (changed) await user.save();
        } else {
            // First-time Google sign-in → create user
            user = await User.create({
                name: name || email.split('@')[0],
                email,
                googleId,
                phone: phone || '',
                role: resolveRole(email),
            });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
            hasPassword: !!user.password,
        });
    } catch (error) {
        console.error("Error with Google auth:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * POST /auth/set-password
 * For Google users to set a password so they can login with email+password
 */
export const setPassword = async (req: Request, res: Response) => {
    const { email, password, phone } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = await bcrypt.hash(password, 10);
        if (phone) user.phone = phone;
        await user.save();

        res.json({ msg: 'Password set successfully' });
    } catch (error) {
        console.error("Error setting password:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * POST /admin/create-gabay
 * Admin creates a gabay account for a kehila
 */
export const createGabay = async (req: Request, res: Response) => {
    const { name, email, password, phone, kehilaSlugs } = req.body;

    if (!name || !email || !password || !phone || !kehilaSlugs?.length) {
        return res.status(400).json({ error: 'name, email, password, phone, kehilaSlugs are required' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'gabay',
            kehilaSlugs,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
        });
    } catch (error) {
        console.error("Error creating gabay:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

/**
 * GET /auth/user/:email
 * Get user by email (used by NextAuth callbacks)
 */
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            kehilaSlugs: user.kehilaSlugs,
            hasPassword: !!user.password,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
