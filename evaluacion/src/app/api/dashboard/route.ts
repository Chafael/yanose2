import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface SalesDaily {
    sale_date: string;
    total_orders: number;
    total_sales: number;
}

interface InventoryRisk {
    id: number;
    name: string;
    stock: number;
    stock_status: string;
}

interface TopProduct {
    id: number;
    name: string;
    category_name: string;
    total_sold: number;
    total_revenue: number;
}

export async function GET() {
    try {
        // Get today's sales
        const todaySales = await query<SalesDaily>(`
      SELECT 
        DATE(created_at) as sale_date,
        COUNT(*) as total_orders,
        COALESCE(SUM(total), 0) as total_sales
      FROM orders 
      WHERE DATE(created_at) = CURRENT_DATE 
        AND status = 'completed'
      GROUP BY DATE(created_at)
    `);

        // Get total sales (all time)
        const totalSales = await query<{ total: number }>(`
      SELECT COALESCE(SUM(total), 0) as total 
      FROM orders 
      WHERE status = 'completed'
    `);

        // Get low stock products count
        const lowStockCount = await query<{ count: number }>(`
      SELECT COUNT(*) as count 
      FROM products 
      WHERE stock < 10 AND is_active = TRUE
    `);

        // Get inventory risk products
        const inventoryRisk = await query<InventoryRisk>(`
      SELECT id, name, stock, stock_status 
      FROM vw_inventory_risk 
      ORDER BY stock ASC 
      LIMIT 5
    `);

        // Get top products
        const topProducts = await query<TopProduct>(`
      SELECT id, name, category_name, total_sold, total_revenue 
      FROM vw_top_products 
      LIMIT 5
    `);

        // Get weekly sales for chart
        const weeklySales = await query<SalesDaily>(`
      SELECT sale_date, total_orders, total_sales 
      FROM vw_sales_daily 
      WHERE sale_date >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY sale_date ASC
    `);

        // Get total products and orders count
        const productCount = await query<{ count: number }>('SELECT COUNT(*) as count FROM products WHERE is_active = TRUE');
        const orderCount = await query<{ count: number }>('SELECT COUNT(*) as count FROM orders');

        return NextResponse.json({
            success: true,
            data: {
                todaySales: todaySales[0] || { total_orders: 0, total_sales: 0 },
                totalSales: totalSales[0]?.total || 0,
                lowStockCount: parseInt(String(lowStockCount[0]?.count || 0)),
                inventoryRisk,
                topProducts,
                weeklySales,
                productCount: parseInt(String(productCount[0]?.count || 0)),
                orderCount: parseInt(String(orderCount[0]?.count || 0)),
            }
        });
    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
