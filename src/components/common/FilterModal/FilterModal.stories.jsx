import { useState } from 'react';
import FilterModal from './FilterModal';

export default {
  title: 'Molecule/FilterModal',
  component: FilterModal,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleApply = (filters) => {
    setAppliedFilters(filters);
    setIsOpen(false);
    console.log('Filters Applied:', filters);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 font-sans">
      <button 
        onClick={() => setIsOpen(true)}
        className="rounded bg-black px-4 py-2 text-white"
      >
        필터 열기
      </button>

      {appliedFilters && (
        <div className="mt-4 p-4 bg-white rounded shadow text-sm">
          <p><strong>분야:</strong> {appliedFilters.fields.join(', ') || '-'}</p>
          <p><strong>문서 타입:</strong> {appliedFilters.docType || '-'}</p>
          <p><strong>상태:</strong> {appliedFilters.status || '-'}</p>
        </div>
      )}

      <FilterModal 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onApply={handleApply}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialFilters: {
    fields: [],
    docType: '',
    status: '',
  },
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  initialFilters: {
    fields: ['Next.js', 'API'],
    docType: '공식문서',
    status: '진행중',
  },
};
