import React from 'react';

interface TableBlockProps {
  headers: string[];
  rows: string[][];
}

const TableBlock: React.FC<TableBlockProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-full table-auto bg-black/10 text-white">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-2 text-left bg-white/10">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-white/5">
              {row.map((cell, cid) => (
                <td key={cid} className="px-4 py-2 text-sm text-white/80">
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
