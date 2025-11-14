"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  UserCircle,
  Upload,
  FileEdit,
  BarChart3,
  Send,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import SignOutButton from "@/components/feature/SignOutButton";

export default function Dashboard() {
  const [active, setActive] = useState("profil");
  const [open, setOpen] = useState(false);

  const menu = [
    { key: "profil", label: "Profil", icon: UserCircle },
    { key: "uploader", label: "Uploader un fichier", icon: Upload },
    { key: "modifier", label: "Modifier du contenu", icon: FileEdit },
    { key: "stats", label: "Statistiques", icon: BarChart3 },
    { key: "requete", label: "Faire une requête", icon: Send },
  ];

  return (
    <div className="h-svh bg-zinc-900 text-zinc-100 flex">

      {/* Mobile top bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 md:hidden">
        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 h-7 text-zinc-200" />
        </button>
        <h1 className="ml-4 text-xl font-semibold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-cyan-400" />
          Dashboard
        </h1>
      </div>

      {/* Sidebar (desktop + mobile drawer) */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button mobile */}
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <X className="w-7 h-7 text-zinc-200" />
        </button>

        <h1 className="text-2xl font-semibold mb-8 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-cyan-400" />
          Dashboard
        </h1>

        {/* Menu */}
        <nav className="flex-1 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-cyan-600 text-zinc-900 shadow"
                    : "hover:bg-zinc-800 text-zinc-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <SignOutButton />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 pt-20 md:pt-10 w-full">
        <h2 className="text-3xl font-bold mb-6 capitalize">{active}</h2>

        <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-6 shadow-lg">
          <p className="text-zinc-300">
            {active === "profil" && "Ici tu peux gérer ton profil utilisateur."}
            {active === "uploader" && "Uploader un ou plusieurs fichiers ici."}
            {active === "modifier" && "Modifier du contenu existant."}
            {active === "stats" && "Visualise les statistiques de ton projet."}
            {active === "requete" && "Effectue une requête ou une action avancée."}
          </p>
        </div>
      </main>
    </div>
  );
}
