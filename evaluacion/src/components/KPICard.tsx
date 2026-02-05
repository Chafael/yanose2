interface KPICardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: string;
    trendUp?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'danger';
}

export default function KPICard({
    title,
    value,
    icon,
    trend,
    trendUp,
    variant = 'default'
}: KPICardProps) {
    const variantStyles = {
        default: 'from-blue-500/20 to-purple-500/20 border-blue-500/30',
        success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
        warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
        danger: 'from-red-500/20 to-rose-500/20 border-red-500/30',
    };

    const iconBgStyles = {
        default: 'bg-blue-500/20 text-blue-400',
        success: 'bg-emerald-500/20 text-emerald-400',
        warning: 'bg-amber-500/20 text-amber-400',
        danger: 'bg-red-500/20 text-red-400',
    };

    return (
        <div className={`
      relative overflow-hidden rounded-2xl p-6
      bg-gradient-to-br ${variantStyles[variant]}
      border backdrop-blur-xl
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
    `}>
            {/* Background decoration */}
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />

            <div className="relative flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-gray-400 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                    {trend && (
                        <p className={`text-sm font-medium ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${iconBgStyles[variant]}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );
}
