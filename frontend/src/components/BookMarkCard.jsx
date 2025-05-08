import React from "react";
import { IoShareOutline } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";

import { useBookmarkStore } from "../store/useBookmarkStore";

const BookMarkCard = ({ bookmark }) => {
  const { deleteBookmark } = useBookmarkStore();

  const copyToClipboard = async (text) => {
    try {
      console.log("Copying to clipboard: ", text); // Check if this gets called
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = async () => {
    try {
      console.log("Sharing bookmark: ", bookmark); // Check if this gets called
      await navigator.share({
        title: bookmark.title,
        text: bookmark.discription || "",
        url: bookmark.url,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="w-full border border-primary/20 md:gap-4 gap-2 h-full relative cursor-pointer  bg-base-100 pb-3 items-start justify-center p-5 rounded-2xl flex  hover:bg-primary/5 shadow-lg transition-all duration-300">
      <div
        onClick={() => deleteBookmark(bookmark._id)}
        className="absolute right-5 hover:bg-primary hover:text-base-100 btn text-md top-2 btn-xs border-none bg-primary/5 rounded-xl text-xl"
      >
        <IoCloseOutline />
      </div>

      {/* Favicon */}
      <div className="md:w-12 md:h-12 mt-1 hidden rounded-full md:flex items-center justify-center bg-white w-10 h-10">
  {bookmark.favicon ? (
    <img
      src={bookmark.favicon}
      alt="favicon"
      className="w-full h-full object-cover  rounded-full"
    />
  ) : (
    <span className="text-xs">N/A</span>
  )}
</div>

      {/* Bookmark content */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-3">
          <div>
            {/* Tag */}
            <span className="font-mono font-bold text-[9px] md:text-[10px] px-2 py-0.5 bg-primary/10 border border-base-content rounded-lg">
              {bookmark.tags}
            </span>

            {/* Title with overflow hidden and half card width */}
            <h1 className="font-bold text-primary/70 text-md md:text-lg  line-clamp-1">
              {bookmark.title}
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-base-content/70 text-sm font-semibold md:text-md  line-clamp-3">
          {bookmark?.discription}
        </p>

        {/* Action buttons */}
        <div className="flex text-md md:text-xl gap-3 text-base-content/80 items-center justify-end font-light">
          <button
            onClick={handleShare}
            className="p-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl bg-primary/10"
          >
            <IoShareOutline />
          </button>

          {/* Copy button */}
          <button
            onClick={() => copyToClipboard(bookmark.url)}
            className="p-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl bg-primary/10"
          >
            <IoIosCopy />
          </button>

          {/* External link button */}
          <button className="p-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl bg-primary/10">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              <LuExternalLink />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookMarkCard;
