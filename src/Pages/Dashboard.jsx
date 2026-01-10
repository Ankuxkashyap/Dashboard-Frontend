import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import PostCard from "../Components/PostCard";
import PostModal from "../Components/PostModal";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/post");
      setPosts(res.data.posts);
    } catch {
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/users/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevPost = () =>
    setSelectedIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));

  const nextPost = () =>
    setSelectedIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white text-black">
      <button
        className="lg:hidden fixed top-3 right-5 z-50 p-2 bg-black text-white text-xl rounded-md"
        onClick={() => setShow(!show)}
      >
        {show ? <RxCross1 /> : <HiOutlineMenu />}
      </button>
      {show && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setShow(false)}
        >
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 transform ${
              show ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block z-40`}
          >
            <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>
            <nav className="space-y-3 flex flex-col">
              <Link className="rounded-md px-3 py-2 text-gray-600 hover:bg-black hover:text-white">
                Dashboard
              </Link>
              <Link
                to="/dashboard/posts"
                className="rounded-md px-3 py-2 text-gray-600 hover:bg-black hover:text-white"
              >
                Posts
              </Link>
              <button
                onClick={handleLogout}
                className=" block lg:hidden text-sm px-4 py-2 rounded-md border hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      <aside className="hidden lg:block w-64 h-screen border-r border-gray-200 p-6">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>
        <nav className="space-y-3 flex flex-col">
          <Link className="rounded-md px-3 py-2 text-gray-600 hover:bg-black hover:text-white">
            Dashboard
          </Link>

          <Link
            to="/dashboard/posts"
            className="rounded-md px-3 py-2 text-gray-600 hover:bg-black hover:text-white"
          >
            Posts
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
          <h2 className="font-semibold">Posts Management</h2>
          <button
            onClick={handleLogout}
            className="hidden lg:block text-sm px-4 py-2 rounded-md border hover:bg-black hover:text-white"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-10">
            <div className="h-20 w-20 text-4xl bg-black text-white flex items-center justify-center rounded-full">
              {user.name[0]}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex flexs-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Posts</h1>
            <Link
              to="/dashboard/posts"
              className="border px-4 py-2 rounded-md hover:bg-black hover:text-white"
            >
              + New Post
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {posts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={() => openModal(index)}
              />
            ))}
          </div>

          {selectedIndex !== null && (
            <PostModal
              post={posts[selectedIndex]}
              onClose={closeModal}
              onPrev={prevPost}
              onNext={nextPost}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
