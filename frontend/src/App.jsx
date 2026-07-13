import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import CreatePost from "./pages/dashboard/CreatePost";
import EditPost from "./pages/dashboard/EditPost";

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        This root container now owns the global theme background color. 
        It stretches edge-to-edge, instantly ensuring the whole page inherits the dark theme base.
      */}
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />

        {/* 
          Removed constraints from here so full-bleed page backgrounds can paint correctly.
          Individual views will control their inner layout centering.
        */}
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />

            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/posts/new"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route path="/posts/:slug" element={<PostDetails />} />

            <Route
              path="/dashboard/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
