import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: number;
    category_name: string;
    is_active: boolean;
}

export async function GET() {
    try {
        const products = await query<Product>(`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.category_id,
        c.name as category_name,
        p.is_active
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = TRUE
      ORDER BY c.name, p.name
    `);

        // Get categories for filtering
        const categories = await query<{ id: number; name: string }>(`
      SELECT id, name FROM categories ORDER BY name
    `);

        return NextResponse.json({
            success: true,
            data: {
                products,
                categories,
            }
        });
    } catch (error) {
        console.error('Inventory API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch inventory data' },
            { status: 500 }
        );
    }
}
