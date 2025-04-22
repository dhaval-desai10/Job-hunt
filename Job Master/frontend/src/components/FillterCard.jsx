import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQurey } from '@/redux/jobSlice'
import { MapPin, Briefcase, DollarSign } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'

function FillterCard() {
    const dispatch = useDispatch();
    const allJobs = useSelector(store => store.job.allJobs);
    const [filterOptions, setFilterOptions] = useState({
        locations: [],
        industries: [],
        salaries: []
    });
    const [filters, setFilters] = useState({
        location: 'all',
        industry: 'all',
        salary: 'all'
    });
    const [searchInputs, setSearchInputs] = useState({
        location: '',
        industry: '',
        salary: ''
    });

    useEffect(() => {
        // Extract unique locations, industries, and salary ranges from jobs
        const locations = [...new Set(allJobs.map(job => job.location))].filter(Boolean);
        const industries = [...new Set(allJobs.map(job => {
            const title = job.title.toLowerCase();
            if (title.includes('frontend')) return 'Frontend Developer';
            if (title.includes('backend')) return 'Backend Developer';
            if (title.includes('full stack')) return 'Full Stack Developer';
            if (title.includes('data')) return 'Data Science';
            return job.title.split(' ')[0];
        }))].filter(Boolean);
        
        // Create salary ranges based on available jobs
        const salaries = allJobs.map(job => job.salary).filter(Boolean);
        const minSalary = Math.min(...salaries);
        const maxSalary = Math.max(...salaries);
        const salaryRanges = [
            `${minSalary}-${minSalary + 5}L`,
            `${minSalary + 5}-${minSalary + 10}L`,
            `${minSalary + 10}-${minSalary + 15}L`,
            `${minSalary + 15}L+`
        ];

        setFilterOptions({
            locations,
            industries,
            salaries: salaryRanges
        });
    }, [allJobs]);

    const handleFilterChange = (type, value) => {
        // Update the filters state
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));

        // Create search query based on all active filters
        let searchQuery = '';
        
        // Handle location filter
        if (type === 'location') {
            if (value === 'all') {
                searchQuery = '';
            } else {
                searchQuery = value;
            }
        }
        
        // Handle industry filter
        if (type === 'industry') {
            if (value === 'all') {
                searchQuery = '';
            } else {
                searchQuery = value;
            }
        }
        
        // Handle salary filter
        if (type === 'salary') {
            if (value === 'all') {
                searchQuery = '';
            } else {
                // Extract the salary range from the value
                const [min, max] = value.split('-').map(s => s.replace('L', ''));
                if (max) {
                    searchQuery = `salary:${min}-${max}`;
                } else {
                    searchQuery = `salary:${min}+`;
                }
            }
        }
        
        // Update the search query in Redux
        dispatch(setSearchQurey(searchQuery));
    };

    const handleSearchInput = (type, value) => {
        setSearchInputs(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const filteredLocations = filterOptions.locations.filter(location => 
        location.toLowerCase().includes(searchInputs.location.toLowerCase())
    );

    const filteredIndustries = filterOptions.industries.filter(industry => 
        industry.toLowerCase().includes(searchInputs.industry.toLowerCase())
    );

    return (
        <div className='w-full bg-gray-800/50 p-6 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-sm'>
            <h1 className='font-bold text-2xl text-white mb-6'>Filter Jobs</h1>
            
            <div className="space-y-4">
                {/* Location Filter */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <label className="font-semibold text-white">Location</label>
                    </div>
                    <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                        <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-gray-200">
                            <SelectValue placeholder="Search or select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <div className="p-2">
                                <Input
                                    type="text"
                                    placeholder="Search location..."
                                    value={searchInputs.location}
                                    onChange={(e) => handleSearchInput('location', e.target.value)}
                                    className="w-full bg-gray-700/50 border-gray-600 text-gray-200"
                                />
                            </div>
                            <SelectItem value="all" className="text-white hover:bg-gray-700">All Locations</SelectItem>
                            {filteredLocations.map((location, index) => (
                                <SelectItem key={index} value={location} className="text-white hover:bg-gray-700">{location}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Industry Filter */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        <label className="font-semibold text-white">Industry</label>
                    </div>
                    <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                        <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-gray-200">
                            <SelectValue placeholder="Search or select industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <div className="p-2">
                                <Input
                                    type="text"
                                    placeholder="Search industry..."
                                    value={searchInputs.industry}
                                    onChange={(e) => handleSearchInput('industry', e.target.value)}
                                    className="w-full bg-gray-700/50 border-gray-600 text-gray-200"
                                />
                            </div>
                            <SelectItem value="all" className="text-white hover:bg-gray-700">All Industries</SelectItem>
                            {filteredIndustries.map((industry, index) => (
                                <SelectItem key={index} value={industry} className="text-white hover:bg-gray-700">{industry}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Salary Filter */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-400" />
                        <label className="font-semibold text-white">Salary Range</label>
                    </div>
                    <Select value={filters.salary} onValueChange={(value) => handleFilterChange('salary', value)}>
                        <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-gray-200">
                            <SelectValue placeholder="Select salary range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all" className="text-white hover:bg-gray-700">All Salaries</SelectItem>
                            {filterOptions.salaries.map((salary, index) => (
                                <SelectItem key={index} value={salary} className="text-white hover:bg-gray-700">{salary}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default FillterCard