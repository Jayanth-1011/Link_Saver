import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useBookmarkStore } from "../store/useBookmarkStore"; // Assuming the Zustand store

const NewBookMark = ({ setNewPage }) => {
  const [url, setUrl] = useState("https://");
  const [tag, setTag] = useState("Personal");
  const { createBookmark } = useBookmarkStore(); // Hook to call the createBookmark action

  const tags = [
    "Personal",
    "Ideas",
    "To Explore",
    "Tech",
    "Design",
    "Career",
    "Health",
  ];

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !url ||
      !url.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/\S*)?$/)
    ) {
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      await createBookmark(url, tag);
      toast.success("Bookmark added successfully!");
      setNewPage(false); // Close the modal after successful submission
    } catch (err) {
      toast.error("Failed to create bookmark. Please try again.");
    }
  };

  return (
    <div className="max-w-sm rounded-2xl bg-base-100 shadow-2xl w-full flex flex-col gap-1 items-center justify-center p-5 px-8">
      <div
        onClick={() => setNewPage(false)}
        className="text-2xl cursor-pointer hover:scale-105 ml-auto text-base-content"
      >
        <IoClose />
      </div>
      <h1 className="font-bold text-xl text-base-content">New Bookmark</h1>

      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </g>
        </svg>
        <input
          type="url"
          required
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
          title="Must be valid URL"
        />
      </label>
      <p className="validator-hint">Must be a valid URL</p>

      <label className="select w-full">
        <span className="label text-base-content">Tag</span>
        <select
          className="select select-bordered w-full"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {tags.map((tagOption) => (
            <option key={tagOption} value={tagOption}>
              {tagOption}
            </option>
          ))}
        </select>
      </label>

      <button className="btn mb-auto mt-4 btn-primary" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default NewBookMark;
