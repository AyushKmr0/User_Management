import Papa from 'papaparse';

export const toCSV = (rows) => {
    const fields = [
        '_id',
        'firstName',
        'lastName',
        'email',
        'phone',
        'gender',
        'status',
        'location',
        'avatarUrl',
        'createdAt'
    ];

    const data = rows.map((r) => ({
        _id: r._id,
        firstName: r.firstName,
        lastName: r.lastName,
        email: r.email,
        phone: r.phone || '',
        gender: r.gender,
        status: r.status,
        location: r.location || '',
        avatarUrl: r.avatarUrl || '',
        createdAt: r.createdAt
    }));
    
    return Papa.unparse({ fields, data });
};
