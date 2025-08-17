import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ActionMenu({ id, onDelete }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return (
        <div
            className="relative inline-block"
            ref={ref}
        >
            <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setOpen((v) => !v)}
                aria-label="actions"
            >
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {open && (
                <div className="dropdown right-0">
                    <Link
                        to={`/users/${id}`}
                        className="menu-item flex items-center gap-2"
                    >
                        <span>
                            <i className="fa-solid fa-eye"></i>
                        </span>{" "}
                        <span>View</span>
                    </Link>
                    <Link
                        to={`/users/${id}/edit`}
                        className="menu-item flex items-center gap-2"
                    >
                        <span>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </span>{" "}
                        <span>Edit</span>
                    </Link>
                    <div
                        onClick={() => onDelete?.(id)}
                        className="menu-item flex items-center gap-2 text-red-600"
                    >
                        <span className="text-red-500">
                            <i className="fa-solid fa-trash"></i>
                        </span>{" "}
                        <span>Delete</span>
                    </div>
                </div>
            )}
        </div>
    );
}
