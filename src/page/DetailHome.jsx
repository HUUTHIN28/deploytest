import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import homeApi from "../api/home"
import { useMutation } from "@tanstack/react-query"


const DetailHome = () => {
    const [dataFrom,setData] = useState({})
    const queryClient = useQueryClient()
    let {id} = useParams()
    const handleChange = (e) => {
        setData({...dataFrom,[e.target.name]:e.target.value})
    }

    const {data} = useQuery({
      queryKey:['detailHouse',id],
      queryFn : () => homeApi.detailHouse({id:id}),
      keepPreviousData:true,
      staleTime:60 * 1000,
    })

const mutation = useMutation({
    mutationFn: dataedit => {
        homeApi.updateHouse(dataedit)
    },
    onSuccess: (data, variables, context) => {
          queryClient.setQueryData(['detailHouse',id],data)
        console.log(`Successerror`,data)
        console.log(`Successcontext`, context)
        console.log(`Successvariables`, variables)
      },
    

})

    const HandleEdit = () => {
      mutation.mutate({id:id,...dataFrom})
    }
    


  console.log('dataDetail',data?.data?.detailHouse

  );

  return (
    <div>DetailHome {id}
    
    <h2>Edit home</h2>
 
    <div>
        <div><input type="number" name='phone' onChange={handleChange}/></div>
        <div><input type="text" name='name' onChange={handleChange}/></div>
        <div><input type="text" name='address' onChange={handleChange}/></div>
        <div><button onClick={HandleEdit}>Edit</button></div>
    </div>
    <div>name:{data?.data?.detailHouse?.name}</div>
    <div>address:{data?.data?.detailHouse?.address}</div>
    <div>phone:{data?.data?.detailHouse?.phone}</div>
    </div>
  )
}

export default DetailHome