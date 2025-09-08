const Table = () => {
    const users = [
        { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending' },
        { name: 'Mike Brown', email: 'mike@example.com', role: 'Viewer', status: 'Inactive' },
    ];

    const getStatusStyle = (status = "Active") => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white shadow rounded-xl overflow-x-auto">
            <table className=" table-md text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className=" hover:bg-gray-50 transition duration-150"
                        >
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                        user.status
                                    )}`}
                                >
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className=" table-md text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {users.map((user, index) => (
                        <tr
                            key={index}
                            className=" hover:bg-gray-50 transition duration-150"
                        >
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                        user.status
                                    )}`}
                                >
                                    {user.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
