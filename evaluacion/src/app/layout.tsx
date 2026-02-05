import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CampusCafe - Sistema de Gestión",
    description: "Sistema de gestión para cafetería universitaria",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${outfit.variable} antialiased`}>
                <div className="min-h-screen bg-gray-900">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
