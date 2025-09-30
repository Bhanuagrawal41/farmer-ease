// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";


// const FarmingSchemes = ({ onClose }) => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch news from backend
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8080/api/news");
//         const data = await res.json();
//         setNews(data.news || []);
//       } catch (err) {
//         console.error("Error fetching news:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 30 }}
//       transition={{ duration: 0.4 }}
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//     >
 

//  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-black"
//           onClick={onClose}
//         >
//           ✖
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Latest Farming Schemes</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : news.length === 0 ? (
//           <p>No schemes available.</p>
//         ) : (
//           <ul className="space-y-3">
//             {news.map((item, i) => (
//               <li
//                 key={i}
//                 className="p-3 border rounded-lg hover:bg-gray-50 transition"
//               >
//                 <a
//                   href={item.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-green-700 font-semibold"
//                 >
//                   {item.title}
//                 </a>
//                 <p className="text-sm text-gray-500">
//                   {item.date ? new Date(item.date).toLocaleDateString() : ""}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>

//     </motion.div>
//   );
// };

// export default FarmingSchemes;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FarmingSchemes = ({ onClose }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {

         await fetch("http://127.0.0.1:8080/api/scrape");
         
        const res = await fetch("http://127.0.0.1:8080/api/news");
        const data = await res.json();
        setNews(data.news || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative flex flex-col"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            Latest Farming Schemes
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : news.length === 0 ? (
            <p className="text-center">No schemes available.</p>
          ) : (
            <div className="overflow-y-auto max-h-96 pr-2">
              {news.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03, backgroundColor: "#f0fdf4" }}
                  className="p-3 border rounded-lg mb-2 cursor-pointer transition-all"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 font-semibold"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FarmingSchemes;

