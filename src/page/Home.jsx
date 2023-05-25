// import React, { Suspense } from 'react';
import OtherComponent from './OtherComponent ';
import AnotherComponent from './AnotherComponent';
// import { useEffect } from 'react';
import { useIsMutating, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import homeApi from '../api/home';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';

// const OtherComponent = React.lazy(() => import('./OtherComponent '));
// const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const Home = () => {
// const getStudent = () => {
  const [offset,setOffset] = useState(0)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  console.log('isFetching',isFetching);
  console.log('isMutating',isMutating);
// }
const {data , isLoading} = useQuery({
  queryKey:['house',offset],
  queryFn: () => homeApi.getHome({limit:5,offset:offset*5}),
  staleTime:60 * 1000,
  keepPreviousData:true
})
console.log('data',data?.data?.listhouse?.house);
console.log('isLoading',isLoading);
//   useEffect(() => {
//     homeApi.getHome().then((res) => {
// console.log('res',res);
//       });
//   },[])

const mutation = useMutation({
  mutationFn : newHouse => {
    return homeApi.postHouse(newHouse)
  }
})
const mutationDelete = useMutation({
  mutationFn: id => {
    return homeApi.deleteHouse({id:id})
  },
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey:['house',offset]})
  }
})

const deleteHouse = (id) => {
  mutationDelete.mutate(id)
}
const handleHover = (id) => {
queryClient.prefetchQuery(['detailHouse',String(id)],{
  queryFn: () => homeApi.detailHouse({id:id}),
  staleTime:60*1000
})
}
  return (
    <div> 
      {/* <Suspense fallback={<div>Loading...</div>}> */}
    
      <div>
        <div>  
          <button  onClick={() => {
        setOffset(0)
      }}>1</button>
      </div>
        <div>  
          <button  onClick={() => {
        setOffset(1)
      }}>2</button>
      </div>

      <div>  
          <button  onClick={() => {
        setOffset(2)
      }}>3</button>
      </div>
      </div>
      <button onClick={() => {mutation.mutate({phone: Number('0395181835'),name:'Nguyễn 1234 hưudgdfgfdfdfdf thin123',address:'xóm 9123'},{
        onError : (error, variables, context) => {
          console.log(`error`,error)
          console.log(`context`,context)
          console.log(`variables`, variables)
        },
        onSuccess: (data, variables, context) => {
          console.log(`Successerror`,data)
          console.log(`Successcontext`, context)
          console.log(`Successvariables`, variables)
        },
      })} }>
        addhouse
      </button>

      <div>
        <h1> List House</h1>
  
        {data?.data?.listhouse?.house?.map((v) => 
          
      
     <div style={{display:'flex',gap:'10px'}} key={v?.id}>
     <div>{v?.id}</div>
     <div onMouseEnter={() => handleHover(v?.id)}>{v?.phone}</div>
     <div>{v?.address}</div>
     <div>{v?.name}</div>
     <div onClick={() => {
      navigate(`/home/${v?.id}`)
     }}>detail</div>
     <div onClick={() => deleteHouse(v?.id)}>delete</div>
   </div>
    
     
        
        )}
      </div>
      
      <OtherComponent />
      <AnotherComponent />

  {/* </Suspense> */}
  <Outlet/>
  </div>
  )
}

export default Home