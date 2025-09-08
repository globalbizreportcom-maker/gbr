import { FaUsers, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';

const Stats = () => {
    const data = [
        {
            label: 'Total Users',
            value: 1280,
            icon: <FaUsers className="text-blue-500 text-3xl" />,
            color: 'from-blue-100 to-blue-50',
        },
        {
            label: 'Bookings',
            value: 342,
            icon: <FaCalendarCheck className="text-purple-500 text-3xl" />,
            color: 'from-purple-100 to-purple-50',
        },
        {
            label: 'Revenue',
            value: '$12,450',
            icon: <FaDollarSign className="text-green-500 text-3xl" />,
            color: 'from-green-100 to-green-50',
        },
        {
            label: 'Orders',
            value: '1200',
            icon: <FaDollarSign className="text-green-500 text-3xl" />,
            color: 'from-rose-100 to-white-50',
        },
        {
            label: 'Pending',
            value: '150',
            icon: <FaDollarSign className="text-green-500 text-3xl" />,
            color: 'from-green-100 to-green-50',
        },
    ];

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
            {data.map((stat, idx) => (
                <div
                    key={idx}
                    className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl transition-all duration-300`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full shadow-inner">
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
