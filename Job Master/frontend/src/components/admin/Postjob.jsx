import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, Building2, MapPin, DollarSign, Clock, GraduationCap, Users } from "lucide-react";

const companyArray = [];

function Postjob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const companies = useSelector((store) => store.company.companies);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({
        ...input,
        [name]: name === "position" ? parseInt(value, 10) || 0 : value,
    });
  };

  const selectChangeHandler = (value)=>{
    const selectedCompany = companies.find((company)=>company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (res.data.success) {
            toast.success(res.data.message);
            navigate('/admin/jobs');
        }
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Post a New Job</h1>
              <p className="text-gray-400">
                Fill in the details to create a new job posting
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-200">Job Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Company</Label>
                  {companies?.length > 0 ? (
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-200">
                        <SelectValue placeholder="Select a Company" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectGroup>
                          {companies.map((company) => (
                            <SelectItem key={company._id} value={company?.name.toLowerCase()}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-red-400">Please register a company first</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Salary</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="salary"
                      value={input.salary}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., $80,000 - $120,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Job Type</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="jobType"
                      value={input.jobType}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., Full-time, Remote"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Experience Level</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="experience"
                      value={input.experience}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., 3-5 years"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Number of Positions</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="number"
                      name="position"
                      value={input.position}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-200">Job Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                    placeholder="Brief description of the role"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-200">Requirements</Label>
                  <Input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                    placeholder="Required skills and qualifications"
                  />
                </div>
              </div>

              <div className="pt-4">
                {loading ? (
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting Job...
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                  >
                    Post New Job
                  </Button>
                )}
              </div>

              {companies.length === 0 && (
                <p className="text-sm text-red-400 text-center">
                  *Please register a company first before posting a job
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postjob;
