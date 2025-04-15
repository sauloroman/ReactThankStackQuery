import { useQuery } from "@tanstack/react-query"
import { getIssue, getIssueComments } from "../actions"

export const useIssue = ( issueNumber: number ) => {

  const issueQuery = useQuery({
    queryKey: ['issues', issueNumber ],
    queryFn: () => getIssue( issueNumber ),
    staleTime: 1000 * 60,
  })

  //* De esta forma, tanto issueQuery como commentsQuery trabajan en paralelo
  // const commentsQuery = useQuery({
  //   queryKey: ['issues', issueNumber, 'comments'],
  //   queryFn: () => getIssueComments( issueNumber ),
  //   staleTime: 1000 * 60,
  // })

  //* De esta forma, una vez que tenemos la data de issueQuery se obtiene la data de commentsQuery
  const commentsQuery = useQuery({
    queryKey: ['issues', issueQuery.data?.number, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    staleTime: 1000 * 60,
    enabled: issueQuery.data !== undefined //* enabled permite identificar cuando debe activarse este query
  })

  return {
    issueQuery,
    commentsQuery,
  }

}