import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
const SideBar = ({setFilter ,setShow ,setTagTitle}) => {
  const handleTagClick = (tag) => {
    setTagTitle(tag)
    setFilter(tag)
  }
  return (
    <div className="w-full h-full pl-4   flex items-center justify-end bg-base-100">
      <div className="bg-base-100 shadow-2xl  w-60 p-4 h-full  gap-4 rounded-l-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-2 p-2 pl-4 border-b mb-4 border-primary">
            <div className="text-xl text-primary">
              <BiSolidCategory />
            </div>
            <h2 className="text-xl font-semibold text-primary">Categories</h2>
            <div className="ml-auto text-2xl md:hidden" onClick={()=>setShow(false)}><IoClose /></div>
          </div>

          <div className="flex flex-col gap-3 ">
            {[
              "All Bookmarks",
              "Ideas",
              "Personal",
              "To Explore",
              "Tech",
              "Design",
              "Career",
              "Health",
            ].map((label) => (
              <button onClick={()=>handleTagClick(label)}
                key={label}
                className="flex  items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary hover:text-base-content transition-colors"
              >
                <div className=""><FaRegBookmark /></div>
                
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default SideBar;
