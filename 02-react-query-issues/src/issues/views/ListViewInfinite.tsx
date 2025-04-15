import React, { useState } from 'react'
import { State } from '../interfaces'
import { useIssuesInfinite } from '../hooks'
import { IssueList, LabelPicker } from '../components'
import { LoadingSpinner } from '../shared/components'

export const ListViewInfinite: React.FC = () => {

  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  const [state, setState] = useState<State>(State.All)

  const { issuesQuery } = useIssuesInfinite({ state, selectedLabel })

  const issues = issuesQuery.data?.pages.flat() ?? []

  const onLabelSelected = ( label: string ) => {

    if ( selectedLabel.includes(label) ) {
      setSelectedLabel( selectedLabel.filter( selectedLabel => selectedLabel !== label ))
    } else {
      setSelectedLabel([...selectedLabel, label])
    }

  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 mt-5'>
      <div className="col-span-1 sm:col-span-2">
        {
          issuesQuery.isLoading
          ? (<LoadingSpinner />)
          : (
            <div className='flex flex-col justify-center'>
              <IssueList onStateChange={ setState } issues={issues} state={state} />
              <button disabled={issuesQuery.isFetchingNextPage} onClick={ () => issuesQuery.fetchNextPage() } className='p-2 bg-blue-500 hover:bg-blue-700 transition-all rounded-md disabled:bg-gray-500'>
                {
                  issuesQuery.isFetchingNextPage
                  ? ('Cargando más...')
                  : ('Cargar más...')
                }
              </button>
            </div>
          )
        } 
      </div>
      <div className="col-span-1 px-2">
        <LabelPicker onLabelSelected={onLabelSelected} selectedLabels={selectedLabel} />
      </div>
    </div>
  )
}
