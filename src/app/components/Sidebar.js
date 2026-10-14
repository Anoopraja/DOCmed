
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Pill,
  Home,
  ShoppingBag,
  LayoutGrid,
  ShoppingCart,
  Package,
  UserRound,
  LayoutDashboard,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const storeLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop Products", href: "/products", icon: ShoppingBag },
  { name: "Categories", href: "/categories", icon: LayoutGrid },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  { name: "My Orders", href: "/orders", icon: Package },
  { name: "Profile", href: "/profile", icon: UserRound },
];

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  function renderLinks(links) {
    return links.map(({ name, href, icon: Icon }) => {
      const active =
        pathname === href ||
        (href !== "/" && pathname.startsWith(`${href}/`));

      return (
        <Link
          key={href}
          href={href}
          title={collapsed ? name : undefined}
          aria-label={name}
          className={`scrollbar-none flex items-center rounded-xl py-3 transition-colors ${
            collapsed
              ? "justify-center px-0"
              : "justify-between px-4"
          } ${
            active
              ? "bg-blue-50 font-semibold text-blue-600"
              : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
          }`}
        >
          <span className={`scrollbar-none flex items-center ${collapsed ? "" : "gap-3"}`}>
            <Icon size={20} strokeWidth={1.8} />
            {!collapsed && (
              <span className="text-sm">{name}</span>
            )}
          </span>
        </Link>
      );
    });
  }

  return (
    <aside
      className={`sticky top-0 inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white transition-[width] duration-300 lg:hidden ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-20 shrink-0 items-center border-b border-slate-100 ${
          collapsed
            ? "justify-center px-2"
            : "justify-between px-5"
        }`}
      >
       
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 ${
            collapsed
              ? "absolute -right-3 top-24 border border-slate-200 bg-white shadow-sm"
              : ""
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen size={19} />
          ) : (
            <PanelLeftClose size={19} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto py-6 ${
          collapsed ? "px-3" : "px-4"
        }`}
      >
        {!collapsed && (
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Store
          </p>
        )}

        <div className="space-y-1">{renderLinks(storeLinks)}</div>

        <div className="my-6 border-t border-slate-200" />

        {!collapsed && (
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Management
          </p>
        )}

        <div className="space-y-1">{renderLinks(adminLinks)}</div>
      </nav>

      {/* Account */}
      <div
        className={`shrink-0 border-t border-slate-200 py-4 ${
          collapsed ? "px-3" : "px-4"
        }`}
      >
        <Link
          href="/profile"
          title={collapsed ? "My Account" : undefined}
          aria-label="My Account"
          className={`flex items-center rounded-xl py-2 hover:bg-slate-50 ${
            collapsed ? "justify-center" : "gap-3 px-2"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            <UserRound size={20} />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                My Account
              </p>
              <p className="text-xs text-slate-500">
                Manage your profile
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
