import React, { useState } from "react";
import InputError from "./InputError";

const SymbolInput = ({
    placeholderText,
    buttonText,
    onButtonClick,
    errors,
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleButtonClick = () => {
        onButtonClick(inputValue);
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder={placeholderText}
                    className="border rounded-l py-2 px-4 h-10 focus:outline-none focus:border-indigo-400"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    onClick={handleButtonClick}
                    className="bg-indigo-500 text-white rounded-r py-2 px-4 hover:bg-indigo-400 focus:outline-none"
                >
                    {buttonText}
                </button>
            </div>
            {Object.entries(errors).map(([key, value]) => (
                    <InputError message={value} className="mt-2"/>
                ))}
        </div>
    );
};

export default SymbolInput;
