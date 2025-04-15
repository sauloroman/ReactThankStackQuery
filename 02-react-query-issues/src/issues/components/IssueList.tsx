import React from 'react'
import { GithubIssue, State } from '../interfaces'
import { IssuesItem } from './IssuesItem';

interface Props {
  issues: GithubIssue[];
  onStateChange: ( state: State ) => void;
  state: string;
}

export const IssueList: React.FC<Props> = ({ issues, onStateChange, state }) => {
  return (
    <>
      <div className='flex gap-4'>
        <button onClick={() => onStateChange(State.All)} className={`btn ${state === State.All && 'active'}`}>All</button>
        <button onClick={() => onStateChange(State.Open)} className={`btn ${state === State.Open && 'active'}`}>Open</button>
        <button onClick={() => onStateChange(State.Closed)} className={`btn ${state === State.Closed && 'active'}`}>Closed</button>
      </div>

      <div className="mt-4">
        {
          issues.map( issue => (
            <IssuesItem key={issue.id} issue={issue} />
          ))
        }
      </div> 

    </>
  )
}
