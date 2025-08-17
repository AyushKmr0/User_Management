import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="w-full bg-gray-900 text-white">
                <div className="mx-auto max-w-6xl px-4 py-4 flex justify-center">
                    <Link
                        to="/users"
                        className="text-lg sm:text-xl font-semibold tracking-wide"
                    >
                        MERN User Manager
                    </Link>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                {children}
            </main>

            <footer className="w-full py-6 text-center text-sm text-gray-500">
            </footer>
        </div>
    );
}
