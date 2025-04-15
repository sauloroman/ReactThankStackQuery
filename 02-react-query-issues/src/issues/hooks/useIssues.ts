import { getIssues } from "../actions";
import { useQuery } from "@tanstack/react-query";
import { State } from "../interfaces";

type issuesOptions = {
  state: State,
  selectedLabel: string[]
}

export const useIssues = ({ state, selectedLabel }: issuesOptions ) => {
  
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, selectedLabel } ],
    queryFn: () => getIssues( state, selectedLabel ),
    staleTime: 1000 * 60,
  })
  
  return {  
    issuesQuery
  }
}