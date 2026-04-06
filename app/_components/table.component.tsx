interface DarkTableProps<T> {
    data: T[];
    columns: string[];
}

export default function DarkTable<T extends Record<string, any>>({
    data,
    columns,
}: DarkTableProps<T>) {
    return (
        <div>
            <table>
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
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
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
        </div>
    );
}