// pages/index.tsx

import blogData from "./blogData";

type BlogsSectionProps = {
  limit?: number; // optional
  sectionTitle?: string; // Title upar
  sectionSubtitle?: string; // Subtitle neeche
  seeMoreLink?: string; // See More button link
};

export default function BlogsSection({
  limit,
  sectionTitle,
  sectionSubtitle,
  seeMoreLink,
}: BlogsSectionProps) {
  const visibleCards = blogData.slice(0, limit || blogData.length);

  return (
    <div className={`${!limit ? "bg-[#e7f0ee] min-h-screen pb-10" : ""}`}>
      {/* ✅ Green Header Section - sirf jab limit na ho */}
      {!limit && (
        <div className="bg-green-900 text-white">
          <div className="w-full h-[400px] flex flex-col items-center justify-center relative overflow-hidden px-4">
            <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
              Happy Buyers, Real Stories
            </h2>
            <p className="mt-3 text-base font-normal tracking-tight">
              Stories from happy buyers who found their car with DriveXDeals.
            </p>

            {/* ✅ Search Section */}
            <div className="mt-6 w-full flex flex-col sm:flex-row items-center justify-center sm:gap-2">
              <div className="flex flex-col sm:flex-row items-end gap-2 rounded-lg shadow-md max-w-[1200px] w-full mx-auto">
                <div className="flex-1 sm:w-[800px] h-[57px] bg-white border border-gray-300 rounded-full flex items-center px-6">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent focus:outline-none border-none text-black font-light"
                  />

                  {/* Filters */}
                  <div className="flex items-center gap-1 ml-0 sm:ml-4">
                    <div className="border border-gray-300 rounded-full px-4 py-2">
                      <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                        <option>Price Range</option>
                        <option>$0 - $100</option>
                        <option>$100 - $500</option>
                        <option>$500+</option>
                      </select>
                    </div>

                    <div className="border border-gray-300 rounded-full px-4 py-2">
                      <select className="bg-transparent focus:outline-none border-none text-gray-700 font-light">
                        <option>All Cities</option>
                        <option>Karachi</option>
                        <option>Lahore</option>
                        <option>Islamabad</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button className="bg-red-700 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-full shadow-lg font-medium transition w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3">
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Section Title & See More - sirf jab limit ho */}
      {limit && (sectionTitle || sectionSubtitle || seeMoreLink) && (
        <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-col">
            {sectionTitle && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="text-gray-600 text-[18px] sm:text-[20px] mt-1">
                {sectionSubtitle}
              </p>
            )}
          </div>
          {seeMoreLink && (
            <a
              href={seeMoreLink}
              className="mt-3 sm:mt-0 px-4 py-2 border border-gray-700 rounded-2xl text-black font-medium hover:bg-gray-100 transition"
            >
              See More
            </a>
          )}
        </div>
      )}

      {/* ✅ Cards Section */}
      <div
        className={`${
          limit ? "mt-4" : "mt-10"
        } max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
      >
        {visibleCards.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition relative"
          >
            <div className="absolute top-0 left-0 w-full bg-[#f1f5f4] border-b border-gray-200"></div>

            <div className="w-[381px] h-[260px] bg-gray-100 p-2 mx-auto mt-2 rounded-[16px] overflow-hidden">
              <img
                src={`/${item.imgSrc}`}
                alt={item.title}
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>

            <div className="p-6 flex flex-col flex-1 text-gray-900 bg-white">
              <h3 className="text-lg font-bold leading-snug mb-3">
                {item.title}
              </h3>
              <p className="text-sm mb-5 flex-1 text-gray-700">
                {item.description}
              </p>

              <button className="mt-auto border border-gray-300 rounded-lg px-5 py-3 font-medium text-gray-800 hover:bg-gray-100 transition">
                Read My Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
