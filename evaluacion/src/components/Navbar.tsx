'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Dashboard', icon: '📊' },
        { href: '/inventory', label: 'Inventario', icon: '📦' },
    ];

    return (
        <nav className="glass-card border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-3xl">☕</span>
                        <span className="text-xl font-bold gradient-text">CampusCafe</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${pathname === item.href
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
