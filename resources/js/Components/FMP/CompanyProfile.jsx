import React from "react";

const CompanyProfile = ({ details }) => {
    const { companyName, description, image, ...restDetails } = details;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    return (
        <div className="max-w-screen-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="border-b flex items-center bg-slate-400 p-3 pl-6 gap-4">
                <img
                    src={image}
                    alt={`${companyName} Logo`}
                    className="h-12 w-12 rounded-full"
                />

                <h2 className="text-2xl font-semibold text-gray-800 p-4">
                    {details.companyName} - Company Profile
                </h2>
            </div>
            <div className="border-b">
                <p className="text-sm font-semibold text-gray-800 p-2">
                    {details.description}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {Object.entries(restDetails).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <p className="text-sm text-gray-500">{capitalizeFirstLetter(key)}</p>
                        <p className="text-lg font-semibold">
                            {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyProfile;
