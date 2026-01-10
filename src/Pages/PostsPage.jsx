import React, { useState } from "react";
import axios from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostsPage = () => {
  const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
  const [form, setForm] = useState({
    title: "",
    caption: "",
    image: "",
    tags: "",
    status: "published",
  });

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

      const res = await axios.post("/post/createPost", postData);

      if (res.status === 201) {
        toast.success("Post created successfully ✅");
        navigator("/dashboard");
        setForm({
          title: "",
          caption: "",
          image: "",
          tags: "",
          status: "published",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-black">
          Create New Post
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
            required
            rows="4"
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
            disabled={loading || !form.title || !form.caption || !form.image}
            className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Admin Dashboard • Post Management
        </p>
      </div>
    </div>
  );
};

export default PostsPage;
