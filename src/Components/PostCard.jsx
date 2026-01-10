import React from "react";

const PostCard = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="aspect-square overflow-hidden"
    >
       <div className="aspect-square w-full">
        <img
          src={post.image}
          alt="post"
          loading="lazy"
          className="w-full h-[90vh] object-cover object-top"
        />
      </div>
    </div>
  );
};

export default PostCard;
