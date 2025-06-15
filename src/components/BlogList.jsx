import { useState, useMemo } from "react";

const BlogList = ({ posts }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch = post.data.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? post.data.category === category : true;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.data.pubDate);
      const dateB = new Date(b.data.pubDate);
      return sortNewest ? dateB - dateA : dateA - dateB;
    });
  }, [posts, search, category, sortNewest]);

  const uniqueCategories = ["Tümü", ...new Set(posts.map(p => p.data.category).filter(Boolean))];
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filtre Alanı */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6 p-4 rounded-xl shadow bg-base-100">
        <div className="flex flex-wrap gap-2">
          {uniqueCategories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setCategory(cat === "Tümü" ? "" : cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-1 rounded-full cursor-pointer ${
                category === cat || (cat === "Tümü" && category === "")
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Yazı ara..."
            className="input input-bordered"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="select select-bordered"
            value={sortNewest ? "newest" : "oldest"}
            onChange={(e) => setSortNewest(e.target.value === "newest")}
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </select>
        </div>
      </div>

      {/* Blog Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-base-300">
              {post.data.heroImage && (
                <a href={`/blog/${post.id}`}>
                <img
                  src={post.data.heroImage}
                  alt={post.data.title}
                  className="w-full h-60 object-cover"
                />
                </a>
              )}
              <div className="p-5">
                {post.data.category && (
                  <span className="inline-block mb-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {post.data.category}
                  </span>
                )}
                <a href={`/blog/${post.id}`}><h2 className="text-lg font-bold mb-1">{post.data.title}</h2></a>
                <p className="text-gray-600 text-sm mb-3">{post.data.description}</p>
                {post.data.tags && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.data.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 mt-4">
                  {post.data.author?.avatar && (
                    <img
                      src={post.data.author.avatar}
                      alt={post.data.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium">{post.data.author?.name}</p>
                    <p className="text-gray-500 text-xs">{post.data.author?.role}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-3">
                  {new Date(post.data.pubDate).toLocaleDateString("tr-TR")}
                </div>
                <div className="mt-4 text-right">
                  <a href={`/blog/${post.id}`} className="btn btn-sm btn-primary">Oku</a>
                </div>
              </div>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded cursor-pointer ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
