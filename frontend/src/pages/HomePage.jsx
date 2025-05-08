import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Bookmarks from '../components/Bookmarks';
import { useBookmarkStore } from '../store/useBookmarkStore';

const HomePage = () => {
  const { bookmarks } = useBookmarkStore();
  const [filter, setFilter] = useState('All Bookmarks');
  const [show, setShow] = useState(false)
  const [tagTitle, setTagTitle] = useState("All Bookmarks")
  // Filter bookmarks based on the selected tag
  const filteredBookmarks = filter === 'All Bookmarks'
    ? bookmarks
    : bookmarks.filter((bookmark) =>
        Array.isArray(bookmark.tags) && bookmark.tags.includes(filter)
      );

  return (
    <div className='flex min-h-screen pt-16 w-full md:px-15 items-start justify-center gap-2 bg-base-100'>
      {/* Desktop Sidebar */}
      <div className='hidden md:flex'>
        <SideBar setFilter={setFilter} setTagTitle = {setTagTitle} />
      </div>

      <div className='w-full flex relative'>
       
        {show && <div className='absolute top-0 h-full left-0 z-40'><SideBar setFilter={setFilter} setShow={setShow}/></div>}

        <Bookmarks filteredBookmarks={filteredBookmarks} tagTitle = {tagTitle} setShow={setShow} />
      </div>
    </div>
  );
};

export default HomePage;
