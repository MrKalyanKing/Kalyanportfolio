

import React, { useContext, useState } from "react";
import upload from '../assets/upload.jpg';
import { AppContext } from "./Contextprovider";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

export function Projects() {
  const url =useContext(AppContext)
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);  // Manage tags as an array of objects
  const [data, setData] = useState({
    title: "",
    description: "",
    githublink: "",
    previewlink: "",
  });

  // Handle changes for form fields
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleErr=()=>{
     toast.error("Project is not saved!", {
          position: "bottom-right",
          autoClose: 5000, // Close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });    
  }

  const handleSucess=()=>{
     toast.success("project added succcesfully!", {
          position: "bottom-right",
          autoClose: 5000, // Close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });    
  }

  // Handle adding a tech stack
  const handleTagAdd = () => {
    const techName = document.getElementById("tech-name").value;
    const color = document.getElementById("tech-color").value;

    if (techName.trim() && color) {
      setTags([
        ...tags,
        {
          id: Date.now(),  // Unique ID for the tag
          name: techName,
          color: color,
        },
      ]);
      document.getElementById("tech-name").value = '';  // Clear input field after adding the tag
      document.getElementById("tech-color").value = '#000000';  // Clear color picker
    }
  };

  // Handle tag removal
  const handleTagRemove = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const projectData = {
  //     ...data,
  //     tags: tags,  // Include tags array in the data
  //     image, // Include the selected image if needed
  //   };

  //   console.log(projectData);  // For debugging, send this to the backend here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append basic project fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('githublink', data.githublink);
    formData.append('previewlink', data.previewlink);
  
    // Append tags (tech stack) as JSON string (to handle array of objects)
    formData.append('tags', JSON.stringify(tags));  // Convert tags to JSON
  
    // Append the image file (if available)
    if (image) {
      formData.append('image', image);
    }
     console.log(formData.entries())
    try {
      // Send the FormData to the backend via axios (POST request)
      const response = await axios.post( "http://localhost:3000/api/project" , formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending files
        },
      });
      handleSucess()
      if (response.data.success) {
       
        console.log('Project saved successfully!');
      } else {
        console.log('Failed to save project.');
        handleErr()
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      handleErr()
    }
  };
  

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-600">Add Project</h1>
        <p className="text-gray-600">ADMIN PANEL</p>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter small title"
              value={data.title}
              onChange={handleChange}
              name="title"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tags (Tech Stack)</label>
            <input
              type="text"
              id="tech-name"
              placeholder="Enter tech stack name (e.g., React)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <input
              type="color"
              id="tech-color"
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Add Tech Stack
            </button>
            <div className="mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-white rounded-full"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag.id)}
                    className="ml-2 text-white"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">GitHub Link</label>
            <input
              type="url"
              placeholder="Enter Github link"
              name="githublink"
              value={data.githublink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Live Preview Link</label>
            <input
              type="url"
              placeholder="Enter project URL"
              name="previewlink"
              value={data.previewlink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="description">
            <label>Description</label><br></br>
            <textarea
              name="description"
              rows="9"
              cols="50"
              value={data.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Images (first image will be shown as thumbnail)
              <img src={image ? URL.createObjectURL(image) : upload} alt="upload" style={{ height: '90px', width: '140px' }} />
            </label>
            <input
              type="file"
              id="project-images"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Project
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
