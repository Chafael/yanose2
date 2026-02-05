'use client';

import { useEffect, useState } from 'react';
import KPICard from '@/components/KPICard';

interface DashboardData {
    todaySales: { total_orders: number; total_sales: number };
    totalSales: number;
    lowStockCount: number;
    inventoryRisk: Array<{ id: number; name: string; stock: number; stock_status: string }>;
    topProducts: Array<{ id: number; name: string; category_name: string; total_sold: number; total_revenue: number }>;
    weeklySales: Array<{ sale_date: string; total_orders: number; total_sales: number }>;
    productCount: number;
    orderCount: number;
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await fetch('/api/dashboard');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            } else {
                setError(json.error);
            }
        } catch (err) {
            setError('Error al cargar el dashboard');
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Cargando dashboard...</p>
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
                    onClick={fetchDashboard}
                    className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Resumen de operaciones de CampusCafe</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Última actualización</p>
                    <p className="text-white font-medium">{new Date().toLocaleString('es-MX')}</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Ventas de Hoy"
                    value={formatCurrency(Number(data?.todaySales?.total_sales || 0))}
                    icon="💰"
                    trend={`${data?.todaySales?.total_orders || 0} órdenes`}
                    trendUp
                    variant="success"
                />
                <KPICard
                    title="Ventas Totales"
                    value={formatCurrency(Number(data?.totalSales || 0))}
                    icon="📈"
                    variant="default"
                />
                <KPICard
                    title="Productos"
                    value={data?.productCount || 0}
                    icon="📦"
                    variant="default"
                />
                <KPICard
                    title="Stock Bajo"
                    value={data?.lowStockCount || 0}
                    icon="⚠️"
                    trend="Productos con menos de 10 unidades"
                    variant={data?.lowStockCount && data.lowStockCount > 0 ? 'danger' : 'success'}
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Low Stock Alert */}
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🚨</span>
                        <h2 className="text-xl font-bold text-white">Alertas de Inventario</h2>
                    </div>
                    {data?.inventoryRisk && data.inventoryRisk.length > 0 ? (
                        <div className="space-y-3">
                            {data.inventoryRisk.map((product) => (
                                <div
                                    key={product.id}
                                    className={`flex items-center justify-between p-4 rounded-xl ${product.stock === 0
                                            ? 'bg-red-500/20 border border-red-500/30 pulse-danger'
                                            : product.stock < 5
                                                ? 'bg-orange-500/20 border border-orange-500/30'
                                                : 'bg-amber-500/20 border border-amber-500/30'
                                        }`}
                                >
                                    <div>
                                        <p className="font-medium text-white">{product.name}</p>
                                        <p className="text-sm text-gray-400">{product.stock_status}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-2xl font-bold ${product.stock === 0 ? 'text-red-400' :
                                                product.stock < 5 ? 'text-orange-400' : 'text-amber-400'
                                            }`}>
                                            {product.stock}
                                        </p>
                                        <p className="text-xs text-gray-400">unidades</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <span className="text-4xl mb-4 block">✅</span>
                            <p className="text-gray-400">No hay productos con stock bajo</p>
                        </div>
                    )}
                </div>

                {/* Top Products */}
                <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🏆</span>
                        <h2 className="text-xl font-bold text-white">Productos Más Vendidos</h2>
                    </div>
                    {data?.topProducts && data.topProducts.length > 0 ? (
                        <div className="space-y-3">
                            {data.topProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500 text-black' :
                                            index === 1 ? 'bg-gray-300 text-black' :
                                                index === 2 ? 'bg-amber-600 text-white' :
                                                    'bg-gray-600 text-white'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-white">{product.name}</p>
                                        <p className="text-sm text-gray-400">{product.category_name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-white">{product.total_sold || 0}</p>
                                        <p className="text-xs text-gray-400">vendidos</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <span className="text-4xl mb-4 block">📊</span>
                            <p className="text-gray-400">No hay datos de ventas aún</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Weekly Sales Chart (Simple) */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📊</span>
                    <h2 className="text-xl font-bold text-white">Ventas de la Semana</h2>
                </div>
                {data?.weeklySales && data.weeklySales.length > 0 ? (
                    <div className="flex items-end gap-4 h-48">
                        {data.weeklySales.map((day, index) => {
                            const maxSales = Math.max(...data.weeklySales.map(d => Number(d.total_sales) || 0));
                            const height = maxSales > 0 ? (Number(day.total_sales) / maxSales) * 100 : 0;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col items-center">
                                        <span className="text-sm text-white font-medium mb-1">
                                            {formatCurrency(Number(day.total_sales))}
                                        </span>
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                                            style={{ height: `${Math.max(height, 10)}%`, minHeight: '20px' }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(day.sale_date).toLocaleDateString('es-MX', { weekday: 'short' })}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <span className="text-4xl mb-4 block">📈</span>
                        <p className="text-gray-400">No hay datos de ventas esta semana</p>
                    </div>
                )}
            </div>
        </div>
    );
}
