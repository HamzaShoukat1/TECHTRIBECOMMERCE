 {/* FilterBar  */}

      <div className="  w-full  ">
        <div className=" flex mx-auto  bg-[#F9F1E7] py-6 px-4 md:px-80  flex-col sm:flex-row gap-4  flex justify-between items-center ">

          {/* Left Controls */}
          <div className="flex items-center gap-6 text-black flex-wrap justify-center sm:justify-start">
            {/* Filter Button */}
            <button className="flex items-center gap-2 hover:opacity-70 transition">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-xl font-normal">Filter</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="hover:opacity-70 transition">
                <LayoutGrid className="w-5 h-5 fill-black" />
              </button>
              <button className="hover:opacity-70 transition">
                <Rows3 className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden sm:block h-8 w-[2px] bg-[#9F9F9F]" />

            <p className="text-base font-normal font-sans">
              Showing 1–16 of 32 results
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-6 text-black flex-wrap justify-center sm:justify-end">
            {/* Show Count Input */}
            <div className="flex items-center gap-4">
              <span className="text-xl font-normal">Show</span>
              <input
                type="text"
                defaultValue="16"
                className="w-[55px] h-[55px] bg-white text-[#9F9F9F] text-xl font-normal text-center focus:outline-none rounded-none"
              />
            </div>

            {/* Sort By Input */}
            <div className="flex items-center gap-4">
              <span className="text-xl font-normal">Short by</span>
              <input
                type="text"
                defaultValue="Default"
                className="w-[188px] h-[55px] bg-white text-[#9F9F9F] text-xl font-normal pl-6 focus:outline-none rounded-none"
              />
            </div>
          </div>
        </div>

      </div>