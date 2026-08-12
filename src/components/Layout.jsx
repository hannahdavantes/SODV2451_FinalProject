import { useState } from "react";
import { Menu, UserCircle } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const email = localStorage.getItem("email") || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="layout-main-shell">
        <header className="layout-topbar">
          <button
            className="layout-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="layout-user-chip">
            <span className="layout-user-avatar">
              <UserCircle size={20} />
            </span>
            <span>{email}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
