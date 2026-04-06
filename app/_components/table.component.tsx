interface DarkTableProps<T> {
    data: T[];
    columns: string[];
    handleMethod: (id: number) => void;
}

export default function DarkTable<T extends Record<string, any>>({
    data,
    columns,
    handleMethod,
}: DarkTableProps<T>) {

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
                        onClick={() => handleMethod(row.id)}
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