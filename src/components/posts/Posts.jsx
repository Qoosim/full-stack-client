// src/App.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { basedUrl } from "../../basedUrl";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  basedUrl();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const createPost = async () => {
    try {
      const { data } = await axios.post("/posts", { title, content });
      fetchPosts();
      setTitle("");
      setContent("");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const deletedPost = await axios.delete("/posts", {
        data: { postId },
      });
      fetchPosts();
      toast.success(deletedPost.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const isEditing = (postId) => editingPostId === postId;

  const toggleEditMode = (postId) => {
    if (isEditing(postId)) {
      // Save edited post
      saveEditedPost();
    } else {
      // Switch to edit mode for the post
      const postToEdit = posts.find((post) => post._id === postId);
      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setEditingPostId(postId);
      }
    }
  };

  const saveEditedPost = async () => {
    try {
      if (!editingPostId) {
        return;
      }

      const editedPost = await axios.put(`/posts`, {
        title,
        content,
        postId: editingPostId,
      });

      fetchPosts();

      // Clear the form and reset the editing state
      setTitle("");
      setContent("");
      setEditingPostId(null); // Reset editingPostId after successful update
      toast.success(editedPost.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setTitle("");
    setContent("");
    toast.info("Editing cancelled");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPostId) {
      saveEditedPost(); // save edited post
    } else {
      createPost(); // create new post
    }
  }

  return (
    <div className="container">
      <h1 className="heading-1 text-center mt-4">Create Post Form</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto my-4">
        <div class="mb-3">
          <input 
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <textarea
            className="form-control" 
            rows="3"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {editingPostId ? "Save Post" : "Create Post"}
        </button>
        {editingPostId && (
          <button
            type="button"
            className="btn btn-warning"
            onClick={cancelEditing}
          >
            Cancel
          </button>
        )}
      </form>
      <div className="my-4 text-center">
        <h1 className="">List of Posts</h1>
      </div>
      <table class="table table-success table-striped table-hover w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post._id}>
              <td className="">{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => deletePost(post._id)}>Delete</button>
                <button className="btn btn-info" onClick={() => toggleEditMode(post._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
