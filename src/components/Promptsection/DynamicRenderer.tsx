import React from 'react';
import ChartBlock from './ChartBlock';
import CardBlock from './CardBlock';
import TableBlock from './TableBlock';  
import TextBlock from './TextBlock';
import LinkBlock from './LinkBlock';
import { DynamicBlock } from './types';
import SuggestedQuestionsBlock from './SuggestedQuestionsBlock';
import SlidesBlock from './SlidesBlock';
import TreeChart from './TreeChart';
import CalendarChart from './CalendarChart';


interface Props {
  response: DynamicBlock[];
}

const renderBlock = (item: DynamicBlock) => {
  switch (item.type) {
    case 'text':
      return <TextBlock {...item} />;
    case 'card':
      return <CardBlock {...item} />;
    case 'table':
      return <TableBlock {...item} />;
    case 'chart':
      return <ChartBlock {...item} />;
    case 'link':
      return <LinkBlock {...item} />;
    case 'suggested_questions':
      return <SuggestedQuestionsBlock {...item} />;
    case 'slides':
      return <SlidesBlock {...item} />;
    case 'tree':
      return <TreeChart {...item}/>;
    case 'calendar':
    return <CalendarChart {...item} />;


    default:
      return <div className="text-red-500">Unknown type: {item}</div>;
  }
};

const DynamicRenderer: React.FC<Props> = ({ response }) => {
  const groupedByRow = response.reduce((acc: Record<number, DynamicBlock[]>, item) => {
    acc[item.row] = acc[item.row] || [];
    acc[item.row].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedByRow).map(([row, items]) => {
        const totalCols = items[0]?.total_columns || 1;
        const columnClass = `grid-cols-${Math.min(Math.max(totalCols, 1), 6)}`; // cap between 1-6

        return (
<div key={row} className={`grid ${columnClass} gap-4`}>
            {items.map((item, i) => (
              <div key={i} className="col-span-1">
                {renderBlock(item)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default DynamicRenderer;
