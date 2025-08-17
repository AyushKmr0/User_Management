import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Users } from "../lib/api.js";

export default function View() {
    const { id } = useParams();
    const [u, setU] = useState(null);

    useEffect(() => {
        Users.get(id)
            .then(setU)
            .catch(() => toast.error("Failed to load"));
    }, [id]);

    if (!u)
        return <div className="container-box p-8 text-center">Loading…</div>;

    return (
        <div className="container-box p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4">
                <img
                    src={
                        u.avatarUrl ||
                        u.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    className="size-16 rounded-full object-cover"
                    alt="profile"
                />

                <div>
                    <h2 className="text-2xl font-semibold">
                        {u.firstName} {u.lastName}
                    </h2>
                    <div className="text-green-600 font-medium">{u.status}</div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <Info
                    label="Email"
                    value={u.email}
                />
                <Info
                    label="Gender"
                    value={u.gender}
                />
                <Info
                    label="Mobile"
                    value={u.phone || "-"}
                />
                <Info
                    label="Location"
                    value={u.location || "-"}
                />
            </div>

            <div className="flex gap-3">
                <Link
                    to={`/users/${u._id}/edit`}
                    className="btn"
                >
                    Edit
                </Link>
                <Link
                    to="/users"
                    className="btn-outline"
                >
                    Back
                </Link>
            </div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="rounded-lg border p-4">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-gray-900">{value}</div>
        </div>
    );
}
