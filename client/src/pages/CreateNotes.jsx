import React from 'react';
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateNotes = () => {

  const navigate = useNavigate();

  const postData =  async(e)=>{
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    if (!title.trim() || !description.trim()) {
      toast.error("Please enter title or description");
      return;
    }


    const data = {
      title ,
      description ,
    };
    //below code is to send data to server
   
   const response =await fetch (`${import.meta.env.VITE_BACKEND_URL}/post-notes`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if(response.status === 200)
    {
      toast.success("Notes added successfully");
      e.target.title.value = "";
      e.target.description.value = "";
     setTimeout(()=>navigate("/"),2000)
    }
    
    else
    {
      toast.error("Something went wrong");
    }

  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

        <div className=' w-[90vw] lg:w-[60vw] mx-auto mt-10  '>
          <h1 className='text-2xl font-bold text-center '>Create Notes</h1>
          <form action="" className=' flex flex-col gap-3 mt-5' onSubmit={postData}>
            <label htmlFor="title" className='font-semibold text-lg'>Title :</label>
            <input type="text" name="title" id=""  placeholder='Enter the Notes Title' className={`px-3 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none 
            `} />
            
            <label htmlFor="description" className='font-semibold text-lg'>Description :</label>
            <textarea name="description" id="" cols="2HLH0" rows="8" placeholder='Enter the Notes Description' className='px-3 py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none '/>

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white px-3 font-black text-lg py-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none' >Post</button>


          </form>
        </div>
    </>
  )
}

export default CreateNotes
