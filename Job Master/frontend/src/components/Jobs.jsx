import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FillterCard from "./FillterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const {allJobs} = useSelector(store=>store.job);
  const searchQurey = useSelector(store=>store.job.searchQurey);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if(searchQurey) {
      const filtredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQurey.toLowerCase()) || 
               job.description.toLowerCase().includes(searchQurey.toLowerCase()) || 
               job.location.toLowerCase().includes(searchQurey.toLowerCase());
      })
      setFilterJobs(filtredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQurey]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[280px]">
            <FillterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <p className="text-gray-300 text-lg">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, y: -20 }}
                    key={job._id}
                    className="h-full"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
