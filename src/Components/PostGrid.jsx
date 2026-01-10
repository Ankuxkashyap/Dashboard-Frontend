import React, { useState } from "react";
import PostCard from "./PostCard";
import PostModal from "./PostModal";

const PostGrid = ({ posts }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevPost = () => {
    setSelectedIndex((prev) => (prev === 0 ? posts?.length - 1 : prev - 1));
  };

  const nextPost = () => {
    setSelectedIndex((prev) => (prev === posts?.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
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
    </div>
  );
};

export default PostGrid;
