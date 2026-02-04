-- ============================================
-- CampusCafe Database Roles
-- ============================================

-- Create app_user with password
CREATE USER app_user WITH PASSWORD 'app_password';

-- Grant CONNECT privilege on the database
GRANT CONNECT ON DATABASE campuscafe TO app_user;

-- Grant USAGE on public schema
GRANT USAGE ON SCHEMA public TO app_user;

-- Grant SELECT only on all tables
GRANT SELECT ON TABLE categories TO app_user;
GRANT SELECT ON TABLE products TO app_user;
GRANT SELECT ON TABLE customers TO app_user;
GRANT SELECT ON TABLE orders TO app_user;
GRANT SELECT ON TABLE order_items TO app_user;

-- Grant SELECT only on all views
GRANT SELECT ON vw_sales_daily TO app_user;
GRANT SELECT ON vw_inventory_risk TO app_user;
GRANT SELECT ON vw_top_products TO app_user;

-- Grant usage on sequences (for SERIAL id reading)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
