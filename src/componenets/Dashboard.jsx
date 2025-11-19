import React, { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "../custom hooks/theme.js";
import { Square } from "ldrs/react";
import "ldrs/react/Square.css";

export default function DashBoard() {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [locationFilter, setLocationFilter] = useState("All");
    const [sortOption, setSortOption] = useState("none");

    useEffect(() => {
        async function fetchingApi() {
            try {
                const response = await axios.get("https://dummyjson.com/c/f8bf-4987-4a34-ba40");
                setCompanies(response?.data?.companies || response?.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchingApi();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen w-full">
                <Square size="35" stroke="5" strokeLength="0.25" bgOpacity="0.1" speed="1.2" color="blue" />
            </div>
        );

    const allLocations = ["All", ...new Set(companies.map((c) => c.location))];

    let filteredCompanies = companies.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesLocation = locationFilter === "All" || company.location === locationFilter;
        return matchesSearch && matchesLocation;
    });

    filteredCompanies = [...filteredCompanies].sort((a, b) => {
        switch (sortOption) {
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            case "employees-asc":
                return a.employees - b.employees;
            case "employees-desc":
                return b.employees - a.employees;
            default:
                return 0;
        }
    });

    return (
        <div
            className="min-h-screen w-full p-6 transition-all"
            style={{
                background: theme.background,
                color: theme.textPrimary,
            }}
        >
            {/* <h1 className="text-3xl font-bold mb-6 text-center">Companies Directory</h1> */}

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by company name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="px-4 py-2 rounded-xl shadow-md w-72 outline-none"
                    style={{
                        background: theme.surface,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary,
                    }}
                />

                {/* Location */}
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl shadow-md w-56 outline-none cursor-pointer"
                    style={{
                        background: theme.surface,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary,
                    }}
                >
                    {allLocations.map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Sorting */}
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 rounded-xl shadow-md w-56 outline-none cursor-pointer"
                    style={{
                        background: theme.surface,
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary,
                    }}
                >
                    <option value="none">Sort By</option>
                    <option value="name-asc">Name (A → Z)</option>
                    <option value="name-desc">Name (Z → A)</option>
                    <option value="employees-asc">Employees (Low → High)</option>
                    <option value="employees-desc">Employees (High → Low)</option>
                </select>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap justify-center cursor-pointer gap-6">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                        <div
                            key={company.id}
                            className="w-80 rounded-2xl shadow-lg overflow-hidden transition-all hover:scale-105"
                            style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
                        >
                            <img src={company.logo} alt={company.name} className="w-full h-48 object-cover" />

                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{company.name}</h2>
                                <p className="text-sm mb-2">📍 {company.location}</p>
                                <p className="text-sm">
                                    <strong>Industry:</strong> {company.industry}
                                </p>
                                <p className="text-sm mt-1">
                                    <strong>Employees:</strong> {company.employees}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: theme.textSecondary }}>No companies match your filters.</p>
                )}
            </div>
        </div>
    );
}
