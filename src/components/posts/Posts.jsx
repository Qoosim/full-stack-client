// src/App.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { basedUrl } from "../../basedUrl";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();

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
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setTitle("");
    setContent("");
    toast.info("Editing cancelled");
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("You are now logged out");
    navigate("/login");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="">
        <div className="">
          <h1 className="">List of Posts</h1>
          <button
            onClick={logout}
            className=""
          >
            Logout
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editingPostId) {
              // Save edited post
              saveEditedPost();
            } else {
              // Create new post
              createPost();
            }
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className=""
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className=""
            />
          </div>
          <button
            type="submit"
            className=""
          >
            {editingPostId ? "Save Post" : "Create Post"}
          </button>
          {editingPostId && (
            <button
              type="button"
              onClick={cancelEditing}
              className=""
            >
              Cancel
            </button>
          )}
        </form>
        <div className="mt-8">
          {posts?.map((post) => (
            <div key={post._id} className="">
              <h2 className="">{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={() => deletePost(post._id)}
                className=""
              >
                Delete
              </button>
              <button
                onClick={() => toggleEditMode(post._id)}
                className=""
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
