import axios from "../utils/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UpdatePost = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    caption: "",
    image: "",
    tags: "",
    status: "published",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/post/getPostById/${id}` ,{ withCredentials: true });
        const post = res.data.post;

        setForm({
          title: post.title || "",
          caption: post.caption || "",
          image: post.image || "",
          tags: post.tags?.join(", ") || "",
          status: post.status || "published",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch post ❌");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        title: form.title,
        caption: form.caption,
        image: form.image,
        tags: form.tags.split(",").map((t) => t.trim()),
        status: form.status,
      };

      const res = await axios.put(`/post/updatePost/${id}`, postData);

      if (res.status === 200) {
        toast.success("Post updated successfully ✅");
        navigator('/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update post ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-black">
          Update Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
          />

          <textarea
            name="caption"
            placeholder="Post Caption"
            value={form.caption}
            onChange={handleChange}
            rows="4"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none resize-none focus:border-black"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-black"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white outline-none focus:border-black"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Admin Dashboard • Post Management
        </p>
      </div>
    </div>
  );
};

export default UpdatePost;
