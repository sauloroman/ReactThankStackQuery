import { useInfiniteQuery } from "@tanstack/react-query";
import { State } from "../interfaces";
import { getIssues } from "../actions";

type issuesOptions = {
  state: State,
  selectedLabel: string[]
}

export const useIssuesInfinite = ({ state, selectedLabel }: issuesOptions ) => {

  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, selectedLabel } ],
    queryFn: ({ pageParam, queryKey }) => {
      const [ , , args ] = queryKey
      const { state, selectedLabel } = args as issuesOptions
      
      return getIssues( state, selectedLabel, pageParam )
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length + 1 : undefined 
  })


  return {  
    issuesQuery,
  }
}