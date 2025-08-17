import { useEffect, useRef, useState } from "react";

export default function StatusDropdown({ value = "Active", onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handle = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("click", handle);
        return () => document.removeEventListener("click", handle);
    }, []);

    const isActive = value === "Active";

    return (
        <div
            className="relative inline-block"
            ref={ref}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="badge"
                title="Change status"
            >
                {isActive ? "Active" : "Inactive"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.044l3.71-3.813a.75.75 0 111.08 1.04l-4.24 4.36a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
            </button>

            {open && (
                <div className="dropdown">
                    <div
                        className="menu-item"
                        onClick={() => {
                            onChange?.("Active");
                            setOpen(false);
                        }}
                    >
                        Active
                    </div>
                    <div
                        className="menu-item"
                        onClick={() => {
                            onChange?.("Inactive");
                            setOpen(false);
                        }}
                    >
                        InActive
                    </div>
                </div>
            )}
        </div>
    );
}
