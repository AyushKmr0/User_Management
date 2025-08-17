import { useEffect, useRef, useState } from "react";

const placeholder = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

export default function AvatarPicker({ file, onChange }) {
    const [preview, setPreview] = useState(placeholder);
    const inputRef = useRef();

    useEffect(() => {
        if (!file) {
            setPreview(placeholder);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    return (
        <div className="flex flex-col items-center gap-3">
            <img
                src={preview}
                alt="avatar"
                className="size-20 rounded-full object-cover ring-4 ring-white shadow"
            />
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onChange?.(e.target.files?.[0])}
            />
        </div>
    );
}
