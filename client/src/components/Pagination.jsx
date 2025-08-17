export default function Pagination({ page, pages, onPage }) {
    if (pages <= 1) return null;

    const prev = () => onPage(Math.max(1, page - 1));
    const next = () => onPage(Math.min(pages, page + 1));

    return (
        <div className="mt-6 flex items-center justify-end gap-2">
            <button
                onClick={prev}
                disabled={page === 1}
                className="btn-outline disabled:opacity-50"
            >
                ‹
            </button>
            <div className="min-w-10 select-none rounded-md bg-rose-700 px-3 py-2 text-center text-white">
                {page} / {pages}
            </div>
            <button
                onClick={next}
                disabled={page === pages}
                className="btn-outline disabled:opacity-50"
            >
                ›
            </button>
        </div>
    );
}
