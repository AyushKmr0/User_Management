import { useState } from "react";

export default function SearchBar({ defaultValue = "", onSearch }) {
    const [term, setTerm] = useState(defaultValue);

    return (
        <div className="flex items-center gap-3 w-sm">
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search"
                className="input max-w-md"
            />
            <button
                className="btn"
                onClick={() => onSearch(term)}
            >
                Search
            </button>
        </div>
    );
}
