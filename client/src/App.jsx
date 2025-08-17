import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import List from "./pages/List.jsx";
import AddEdit from "./pages/AddEdit.jsx";
import View from "./pages/View.jsx";

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/users"
                            replace
                        />
                    }
                />
                <Route
                    path="/users"
                    element={<List />}
                />
                <Route
                    path="/users/add"
                    element={<AddEdit />}
                />
                <Route
                    path="/users/:id"
                    element={<View />}
                />
                <Route
                    path="/users/:id/edit"
                    element={<AddEdit />}
                />
                <Route
                    path="*"
                    element={<div className="p-6">Not found</div>}
                />
            </Routes>
        </Layout>
    );
}
