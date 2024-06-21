import React from "react";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [posts, setposts] = useState([]);
  const [editpost, seteditpost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(" ");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");





  useEffect(() => {
    getposts();
  }, [posts]);

  const getposts = async () => {
    let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-notes`);
    let data = await response.json();
    setposts(data.notes);
  };

  const deletePost = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-notes/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success("Notes Deleted success");
    } else {
      toast.error("Something went wrong");
    }
  };


  const updatePost = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update-notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    if (response.status === 200) {
      toast.success("Notes Updated success");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="my-10  ">
        {posts.map((post) => {
          return (
            <div
              className="w-[80vw] mx-auto  p-3 rounded-md  shadow-md bg-slate-50 my-3  md:w-[50vw] "
              key={post._id}
            >
              <div className="flex justify-end gap-3 text-xl ">
                <MdDelete
                  className="text-gray-400 hover:text-red-500 cursor-pointer hover:scale-110 transition-all"
                  onClick={() => deletePost(post._id)}
                />
                <FaPencilAlt
                  className={`${
                    selectedPost === post._id && editpost
                      ? "text-red-400"
                      : "text-gray-400 scale-110"
                  } hover:text-red-500 cursor-pointer hover:scale-110 transition-all`}
                  onClick={() => {
                    seteditpost(!editpost);
                    setSelectedPost(post._id);
                  }}
                />
              </div>
              <h2
                className="font-bold text-lg font-sans  outline-none focus:bg-gray-200  selection:bg-blue-300"
                contentEditable={editpost}
                onInput={(e)=>{ setTitle (e.target.innerText)

                }}
              >
                {post.title}
              </h2>
              <h4 className="text-gray-600 font-semibold font-sans mt-2 outline-none selection:bg-blue-200 focus:bg-gray-300"
              contentEditable={editpost}
              onInput={(e)=>{ setDescription (e.target.innerText)}}
              >
                {post.description}
              </h4>
              <button
                className={`${
                  selectedPost === post._id && editpost ? "block" : "hidden"
                } bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md my-1`}
                onClick={() => {
                  updatePost(post._id);
                }}
              >
                save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
