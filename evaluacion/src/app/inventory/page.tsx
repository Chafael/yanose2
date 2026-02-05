'use client';

import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    category_name: string;
}

interface Category {
    id: number;
    name: string;
}

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch('/api/inventory');
            const json = await res.json();
            if (json.success) {
                setProducts(json.data.products);
                setCategories(json.data.categories);
            } else {
                setError(json.error);
            }
        } catch (err) {
            setError('Error al cargar el inventario');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        }).format(value);
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { label: 'Sin Stock', color: 'bg-red-500' };
        if (stock < 5) return { label: 'Crítico', color: 'bg-red-500' };
        if (stock < 10) return { label: 'Bajo', color: 'bg-orange-500' };
        return { label: 'Normal', color: 'bg-emerald-500' };
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const lowStockCount = products.filter((p) => p.stock < 10).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Cargando inventario...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card rounded-2xl p-8 text-center">
                <span className="text-4xl mb-4 block">⚠️</span>
                <h2 className="text-xl font-bold text-white mb-2">Error</h2>
                <p className="text-gray-400">{error}</p>
                <button
                    onClick={fetchInventory}
                    className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Inventario</h1>
                    <p className="text-gray-400">
                        {products.length} productos en total • {lowStockCount} con stock bajo
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory ?? ''}
                        onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} className="bg-gray-800">
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockCount > 0 && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-4">
                    <span className="text-3xl">⚠️</span>
                    <div>
                        <p className="font-bold text-white">¡Atención!</p>
                        <p className="text-red-200">
                            {lowStockCount} producto{lowStockCount > 1 ? 's' : ''} con stock menor a 10 unidades
                        </p>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-4 text-gray-400 font-medium">Producto</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Categoría</th>
                                <th className="text-right p-4 text-gray-400 font-medium">Precio</th>
                                <th className="text-center p-4 text-gray-400 font-medium">Stock</th>
                                <th className="text-center p-4 text-gray-400 font-medium">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => {
                                const stockStatus = getStockStatus(product.stock);
                                const isLowStock = product.stock < 10;

                                return (
                                    <tr
                                        key={product.id}
                                        className={`border-b border-white/5 table-row-hover ${isLowStock ? 'low-stock-row' : ''
                                            }`}
                                    >
                                        <td className="p-4">
                                            <div>
                                                <p className={`font-medium ${isLowStock ? 'text-red-300' : 'text-white'}`}>
                                                    {product.name}
                                                </p>
                                                {product.description && (
                                                    <p className="text-sm text-gray-400 truncate max-w-xs">
                                                        {product.description}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                                                {product.category_name}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="text-white font-medium">{formatCurrency(product.price)}</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`text-2xl font-bold ${product.stock === 0 ? 'text-red-500' :
                                                    product.stock < 5 ? 'text-red-400' :
                                                        product.stock < 10 ? 'text-orange-400' :
                                                            'text-emerald-400'
                                                }`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white ${stockStatus.color}`}>
                                                {product.stock === 0 && <span>❌</span>}
                                                {product.stock > 0 && product.stock < 10 && <span>⚠️</span>}
                                                {product.stock >= 10 && <span>✅</span>}
                                                {stockStatus.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <span className="text-4xl mb-4 block">📦</span>
                        <p className="text-gray-400">No se encontraron productos</p>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-sm text-gray-400">Sin Stock / Crítico (&lt;5)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span className="text-sm text-gray-400">Stock Bajo (&lt;10)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded" />
                    <span className="text-sm text-gray-400">Stock Normal (≥10)</span>
                </div>
            </div>
        </div>
    );
}
