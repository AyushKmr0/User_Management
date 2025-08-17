import StatusDropdown from "./StatusDropdown.jsx";
import ActionMenu from "./ActionMenu.jsx";

export default function UserTable({ items, onStatus, onDelete }) {
    return (
        <div className="container-box">
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        <th className="table-th">ID</th>
                        <th className="table-th">FullName</th>
                        <th className="table-th">Email</th>
                        <th className="table-th">Gender</th>
                        <th className="table-th">Status</th>
                        <th className="table-th">Profile</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {items.map((u, i) => (
                        <tr key={u._id || i}>
                            <td className="table-td">{u.seq ?? i + 1}</td>
                            <td className="table-td">
                                {u.firstName} {u.lastName}
                            </td>
                            <td className="table-td">{u.email}</td>
                            <td className="table-td">{u.gender}</td>
                            <td className="table-td">
                                <StatusDropdown
                                    value={u.status}
                                    onChange={(v) => onStatus?.(u._id, v)}
                                />
                            </td>
                            <td className="table-td">
                                {u.avatarUrl || u.avatar ? (
                                    <img
                                        src={u.avatarUrl || u.avatar}
                                        alt="profile"
                                        className="size-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        alt="profile"
                                        className="size-8 rounded-full object-cover"
                                    />
                                    
                                )}
                            </td>
                            <td className="table-td">
                                <ActionMenu
                                    id={u._id}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td
                                className="table-td text-center"
                                colSpan={7}
                            >
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
