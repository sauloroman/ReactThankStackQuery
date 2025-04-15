import React, { useState } from 'react'
import { State } from '../interfaces'
import { useIssues } from '../hooks'
import { IssueList, LabelPicker } from '../components'
import { LoadingSpinner } from '../shared/components'

export const ListView: React.FC = () => {

  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  const [state, setState] = useState<State>(State.All)

  const { issuesQuery } = useIssues({ state, selectedLabel })

  const issues = issuesQuery.data ?? []

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
          : (<IssueList onStateChange={ setState } issues={issues} state={state} />)
        } 
      </div>
      <div className="col-span-1 px-2">
        <LabelPicker onLabelSelected={onLabelSelected} selectedLabels={selectedLabel} />
      </div>
    </div>
  )
}
