import React, { useEffect, useState } from 'react'
import CategoryView from '../../components/CategoryView'
import { getCategories } from '../../services/CategoryService'
import { toast } from 'react-toastify'

const ViewCategories = () => {

  const [categories,setCategories] = useState({
    content: []
  })

  useEffect(()=>{
    getCategories()
      .then(data=>{
        console.log(data);
        setCategories(data)
      })
      .catch(error=>{
        console.log(error.response.data.message);
        toast.error("Error in loading categories from server!!")
      })
      .finally(()=>{
      })
  }, [])

  return (
    <>
      {
        categories.content.map(category=>{
        return <CategoryView category={category} key={category.categoryId}/>
      })
      }
    </>
  )
}

export default ViewCategories
