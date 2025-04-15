import React from 'react'
import { useLabels } from '../hooks';
import { LoadingSpinner } from '../shared/components';

interface Props {
  selectedLabels: string[];
  onLabelSelected: ( label: string ) => void;
}

export const LabelPicker: React.FC<Props> = ({ selectedLabels, onLabelSelected }) => {
  
  const { labelsQuery } = useLabels()

  if ( labelsQuery.isLoading ) return (
    <div className="flex justify-center items-center h-52">
      <LoadingSpinner />
    </div>
  ) 

  return (
    <div className='flex flex-wrap gap-2 justify-center'>
      {
        labelsQuery.data?.map( labelQuery => (
          <span
            style={{ border: `1px solid #${labelQuery.color}`}}
            className={`${selectedLabels.includes(labelQuery.name) && 'selected-label'} animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer`}
            key={labelQuery.id}
            onClick={() => onLabelSelected( labelQuery.name ) }
          >
            {labelQuery.name}
          </span>
        ))
      }
    </div>
  )
}
