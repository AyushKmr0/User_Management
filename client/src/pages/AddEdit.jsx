import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Users } from "../lib/api.js";
import AvatarPicker from "../components/AvatarPicker.jsx";

const Field = ({ label, children, error }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {children}
        {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
);

export default function AddEdit() {
    const { id } = useParams();
    const nav = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "M",
        status: "Active",
        location: "",
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEdit) return;
        Users.get(id)
            .then((u) => {
                setForm({
                    firstName: u.firstName || "",
                    lastName: u.lastName || "",
                    email: u.email || "",
                    phone: u.phone || "",
                    gender: u.gender || "M",
                    status: u.status || "Active",
                    location: u.location || "",
                });
            })
            .catch(() => toast.error("Failed to load"))
            .finally(() => setLoading(false));
    }, [id, isEdit]);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form };
            if (avatarFile) payload.avatar = avatarFile;
            if (isEdit) {
                await Users.update(id, payload);
                toast.success("Updated");
            } else {
                await Users.create(payload);
                toast.success("Created");
            }
            nav("/users");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Save failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return <div className="container-box p-8 text-center">Loading…</div>;

    return (
        <div className="container-box p-6 sm:p-8">
            <h1 className="text-center text-3xl font-semibold mb-6">
                Register Your Details
            </h1>

            {/* center avatar */}
            <div className="flex justify-center mb-8">
                <AvatarPicker
                    file={avatarFile}
                    onChange={setAvatarFile}
                />
            </div>

            <form
                onSubmit={submit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <Field label="First name">
                    <input
                        className="input"
                        placeholder="Enter FirstName"
                        value={form.firstName}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                firstName: e.target.value,
                            }))
                        }
                    />
                </Field>

                <Field label="Last Name">
                    <input
                        className="input"
                        placeholder="Enter LastName"
                        value={form.lastName}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, lastName: e.target.value }))
                        }
                    />
                </Field>

                <Field label="Email address">
                    <input
                        className="input"
                        placeholder="Enter Email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                        }
                    />
                </Field>

                <Field label="Mobile">
                    <input
                        className="input"
                        placeholder="Enter Mobile"
                        value={form.phone}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                    />
                </Field>

                <Field label="Select Your Gender">
                    <div className="flex items-center gap-6">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={form.gender === "M"}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        gender: e.target.value,
                                    }))
                                }
                            />
                            <span>Male</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={form.gender === "F"}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        gender: e.target.value,
                                    }))
                                }
                            />
                            <span>Female</span>
                        </label>
                    </div>
                </Field>

                {/* Status select with down arrow */}
                <Field label="Select Your Status">
                    <select
                        className="input"
                        value={form.status}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, status: e.target.value }))
                        }
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </Field>

                <Field label="Select Your Profile">
                    <input
                        type="file"
                        className="input"
                        accept="image/*"
                        onChange={(e) =>
                            setAvatarFile(e.target.files?.[0] || null)
                        }
                    />
                </Field>

                <Field label="Enter Your Location">
                    <input
                        className="input"
                        placeholder="Enter Your Location"
                        value={form.location}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, location: e.target.value }))
                        }
                    />
                </Field>

                {/* Submit full width */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="btn w-full"
                    >
                        {saving ? "Submitting…" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
