import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetApliedjobs";

// const skills = ["Html","Css","javaScript","ReactJs"];
const isResume = true;

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden mb-8 hover:border-gray-600/50 transition-all duration-300">
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-4 ring-blue-500/20 transition-all duration-300 group-hover:ring-blue-500/40 group-hover:scale-105">
                    <AvatarImage 
                      src={user?.profile?.profilePhoto || "https://imgs.search.brave.com/68f9Ql2VSS1Jq1s4cg-w6La7HZnxeMfJHy-QZHqsVeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzI3Lzk5LzQ4/LzM2MF9GXzMyNzk5/NDgwNV8xRzBiQkVp/TXg5eVR6MFZCNXZF/elFyOWRFVWcwVGxC/TC5qcGc"} 
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </Avatar>
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-full transition-colors duration-300" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{user?.fullname}</h1>
                  <p className="text-gray-400">{user?.profile?.bio || "No bio available"}</p>
                </div>
              </div>
              <Button 
                onClick={() => setOpen(true)} 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
              >
                <Pen className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors duration-300">
                <Contact className="w-5 h-5 text-green-400" />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge 
                      key={index}
                      className="bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-colors duration-300"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400">No skills added yet</span>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Label className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Resume
              </Label>
              {isResume ? (
                <a 
                  target="blank" 
                  href={user?.profile?.resume} 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-400">No resume uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Applied Jobs</h2>
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
