import User from '../models/User.js';
import { toCSV } from '../utils/csv.js';

// search filter
const buildFilter = (q) => {
    if (!q) return {};
    const rx = new RegExp(q, 'i');
    return {
        $or: [
            { firstName: rx },
            { lastName: rx },
            { email: rx },
            { phone: rx },
            { location: rx }
        ]
    };
};

export const listUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 5));
        const q = req.query.q || '';
        const filter = buildFilter(q);

        const [items, total] = await Promise.all([
            User.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            User.countDocuments(filter)
        ]);

        // Add sequential ID
        const seqItems = items.map((u, i) => ({
            ...u.toObject(),
            seq: (page - 1) * limit + i + 1
        }));

        res.json({ items: seqItems, total, page, limit, pages: Math.ceil(total / limit) });
    } catch (err) { next(err); }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) { next(err); }
};

export const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, gender, status, location } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Email already exists' });

        let avatarUrl;
        if (req.file) avatarUrl = `${ req.protocol }://${ req.get('host') }/uploads/${ req.file.filename }`;


        const user = await User.create({ firstName, lastName, email, phone, gender, status, location, avatarUrl });

        await user.save();
        res.json(user);
    } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, gender, status, location } = req.body;

        let update = { firstName, lastName, email, phone, gender, status, location };

        if (req.file) {
            update.avatarUrl = `${ req.protocol }://${ req.get('host') }/uploads/${ req.file.filename }`;

        }

        const user = await User.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) { next(err); }
};

export const exportCSV = async (req, res, next) => {
    try {
        const q = req.query.q || '';
        const filter = buildFilter(q);
        const users = await User.find(filter).sort({ createdAt: -1 });
        const csv = toCSV(users);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
        res.status(200).send(csv);
    } catch (err) { next(err); }
};
