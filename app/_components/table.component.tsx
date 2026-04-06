'use client';

interface DarkTableProps<T> {
    data: T[];
    columns: string[];
}

export default function DarkTable<T extends Record<string, any>>({
    data,
    columns,
}: DarkTableProps<T>) {
    
    const handleUserDetail = (id: number) => {
        window.location.href = `/user/${id}`;
    }

    return (
        <table className="dark-table">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={String(col)}
                        >
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr
                        onClick={() => handleUserDetail(row.id)}
                        key={row.id}
                    >
                        {columns.map((col) => (
                            <td key={String(col)}>
                                {col === 'isActive' ? (row[col] ? 'Yes' : 'No') : row[col]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}