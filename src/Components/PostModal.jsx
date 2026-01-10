import axios from "../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PostModal = ({ post, onClose, onPrev, onNext }) => {
  if (!post) return null;

  const handelDelete = async () => {
    try {
      const res = await axios.delete(`/post/deletePost/${post._id}`);
      if (res.status === 200) {
        toast.success("Post deleted successfully ✅");
        onClose();
      } else {
        toast.error("Failed to delete post ❌");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3">
      <div className="relative bg-white rounded-xl w-full max-w-4xl h-[60vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row">
        
        <button
          className="absolute top-3 right-3 z-20 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <div className="relative w-full md:w-1/2 h-[45vh] md:h-full bg-black flex items-center justify-center">
          <img
            src={post.image}
            alt="post"
            className="w-full object-top h-full object-cover"
            loading="lazy"
          />

          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
            onClick={onPrev}
          >
            ‹
          </button>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
            onClick={onNext}
          >
            ›
          </button>
        </div>

        <div className="w-full h-auto md:w-1/2 p-5 flex flex-col">
          <h2 className="text-xl font-semibold mb-3">{post.title}</h2>

          <div className="flex-1 overflow-y-auto text-gray-700 text-sm sm:text-base">
            {post.content}
          </div>

          <div className="flex justify-end mt-4 gap-4">
            <Link
              to={`/post-update/${post._id}`}
              className="text-black hover:text-gray-800 cursor-pointer text-lg"
            >
              Edit
            </Link>
            <button
              onClick={handelDelete}
              className="text-red-600 hover:text-red-800 cursor-pointer text-lg"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostModal;
