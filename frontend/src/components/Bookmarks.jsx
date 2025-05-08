import React, { useEffect, useState } from "react";
import BookMarkCard from "./BookMarkCard";
import NewBookMark from "./NewBookMark";
import { useBookmarkStore } from "../store/useBookmarkStore.js";
import { RiMenu2Line } from "react-icons/ri";

const Bookmarks = ({ filteredBookmarks = [] , setShow , tagTitle}) => {
  // Default empty array
  const [newPage, setNewPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchBookmarks } = useBookmarkStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookmarks = async () => {
      setLoading(true);
      await fetchBookmarks();
      setLoading(false);
      
    };
    getBookmarks();
  }, [fetchBookmarks]);

  // Safely filter bookmarks, ensure filteredBookmarks is defined and is an array
  const filteredAndSearchedBookmarks = (filteredBookmarks || []).filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col mt-2 relative bg-base-100 h-[calc(100vh-6rem)] shadow-2xl rounded-2xl w-full items-center p-2 justify-start min-h-0">
      {newPage && (
        <div className="flex items-center px-5 justify-center absolute inset-0 z-40 w-full h-full bg-primary/10">
          <NewBookMark setNewPage={setNewPage} />
        </div>
      )}
      <div className="md:hidden flex w-full items-center justify-center gap-4 mb-2 px-2">
        <div className="md:hidden" onClick={()=>setShow(true)}><RiMenu2Line /></div>
        <label className="input w-full rounded-2xl border-base-content">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="3.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-between items-center w-full p-2 pr-6">
        <div className="text-lg p-2 font-medium">{tagTitle}</div>
        <button
          onClick={() => setNewPage(!newPage)}
          className="p-2 px-4 bg-primary border btn rounded-full font-medium text-base-100"
        >
          New
        </button>
      </div>

      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : filteredAndSearchedBookmarks.length === 0 ? (
        <div>No bookmarks found.</div>
      ) : (
        <ul className="flex w-full h-full flex-col gap-3 px-2 items-center justify-start overflow-y-auto min-h-0">
          {filteredAndSearchedBookmarks.map((bookmark) => (
            <li className="w-full" key={bookmark._id}>
              <BookMarkCard bookmark={bookmark} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
