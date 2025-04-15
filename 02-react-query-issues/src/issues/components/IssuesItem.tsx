import React from 'react'
import { GithubIssue, State } from '../interfaces'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { timeSince } from '../../helpers/timeSince';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';

interface Props {
  issue: GithubIssue;
}

export const IssuesItem: React.FC<Props> = ({ issue }) => {

  const navigate = useNavigate()

  //* Este hook da acceso al cliente global de consultas (queryClient), que es como
  //* el "centro de control" de toda la caché y lógica de queries en tu app
  const queryClient = useQueryClient()

  const prefetchData = () => {

    //* prefetchQuery se usa para precargar datos en caché antes de que el 
    //* componente lo necesite. 

    //* Esto no muestra nada en pantalla, pero guarda la respuesta en la caché
    //* Cuando el componente que use esa query se monte, los datos ya estarán listos - sin loading

    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number ],
      queryFn: () => getIssue( issue.number ),
      staleTime: 1000 * 60,
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', issue.number, 'comments'],
      queryFn: () => getIssueComments( issue.number ),
      staleTime: 1000 * 60,
    })

  }  

  const presetData = () => {

    //* setQueryData inyecta manualmente datos en la caché, sin hacer ninguna petición HTTP

    //* Se guarda el issue directamente como valor para la key ['issues', issue.number].

    //* Se le dice a react-query: "Este dato fue actualizado hace 1 minuto en el futuro", lo cual es un truco para que lo considere fresco por más tiempo.

    //* Este updatedAt es clave: si no lo pones, el dato se considerará viejo y react-query lo refetchará de todos modos.

    queryClient.setQueryData(['issues', issue.number], issue, {
      updatedAt: Date.now() + (1000 * 60)
    })
  }

  return (
    <div 
      onMouseEnter={ prefetchData }
      // onMouserEnter={ presetData }
      className='animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800'>

      {
        issue.state === State.Closed
        ? (<FiCheckCircle size={30} color='green' className='min-w-10' />)
        : (<FiInfo size={30} color='red' className='min-w-10' />)
      }

      <div className="flex flex-col flex-grow px-2">
        
        <a 
          onClick={() => navigate(`/issues/issue/${issue.number}`)} className='hover:underline'
        >
          {issue.title}
        </a>

        <span className='text-gray-500'>
          #${issue.number} opened { timeSince(issue.created_at) } days ago by {' '}
          <span className='font-bold'>{issue.user.login}</span>
        </span>

        <div className="flex flex-wrap">
          {
            issue.labels.map( label => (
              <span
                style={{ border: `1px solid #${label.color}`}}
                className='px-2 mr-2 py-1 text-xs text-white rounded-md'
                key={label.id}
              >{label.name}</span>
            ))
          }
        </div>

      </div>

      <img src={issue.user.avatar_url} alt="User Avatar" className='w-8 h-8 rounded-full' />

      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className='min-w-5' color='gray' />
        <span className='px-4 text-gray-400'>{issue.comments}</span>
      </div>
        
    </div>
  )
}
