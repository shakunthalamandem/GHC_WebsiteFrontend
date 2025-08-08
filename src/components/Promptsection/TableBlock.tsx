import React from 'react';

interface TableBlockProps {
  headers: string[];
  rows: string[][];
}

const TableBlock: React.FC<TableBlockProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full table-auto bg-gray-50 text-black">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-sm font-medium text-gray-800 bg-gray-100 border-b border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-200 hover:bg-gray-100 transition-colors">
              {row.map((cell, cid) => (
                <td key={cid} className="px-4 py-2 text-sm text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBlock;
