import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Users } from "../lib/api.js";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import UserTable from "../components/UserTable.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function List() {
    const [data, setData] = useState({
        items: [],
        page: 1,
        pages: 1,
        total: 0,
        limit: 5,
    });
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useSearchParams();

    const page = Number(params.get("page") || 1);
    const q = params.get("q") || "";

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await Users.list({ page, limit: 5, q });
            // Expecting server to return: { items, page, pages, total }
            setData(res);
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, q]);

    const onPage = (p) => {
        const newParams = {};
        if (q) newParams.q = q;
        newParams.page = String(p);
        setParams(newParams);
    };

    const onSearch = (term) => {
        const newParams = {};
        if (term) newParams.q = term;
        newParams.page = "1";
        setParams(newParams);
    };

    const onDelete = async (id) => {
        if (!confirm("Delete this user?")) return;
        try {
            await Users.remove(id);
            toast.success("User deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    const onStatus = async (id, status) => {
        try {
            await Users.update(id, { status });
            toast.success("Status updated");
            fetchData();
        } catch {
            toast.error("Status change failed");
        }
    };

    const onExport = async () => {
        try {
            const res = await Users.exportCSV(q);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "users.csv";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch {
            toast.error("Export failed");
        }
    };

    return (
        <div className="space-y-5">
            {/* top controls like screenshot */}
            <div className="flex items-center justify-between gap-4">
                <SearchBar
                    defaultValue={q}
                    onSearch={onSearch}
                />
                <div className="flex items-center gap-3">
                    <Link
                        to="/users/add"
                        className="btn"
                    >
                        <i className="fa-solid fa-plus"></i> Add User
                    </Link>
                    <button
                        onClick={onExport}
                        className="btn-outline"
                    >
                        Export To Csv
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="container-box p-8 text-center">Loading…</div>
            ) : (
                <>
                    <UserTable
                        items={data.items}
                        onStatus={onStatus}
                        onDelete={onDelete}
                    />
                    <Pagination
                        page={data.page}
                        pages={data.pages}
                        onPage={onPage}
                    />
                </>
            )}
        </div>
    );
}
