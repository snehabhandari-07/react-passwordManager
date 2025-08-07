import React from 'react';

const InputForm = ({
    formData,
    handleInputChange,
    handleSubmit,
    showFormPassword,
    togglePasswordVisibility,
    imgRef
}) => {
    return (
        <div className="flex justify-center mt-6 px-4">
            <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center justify-center w-full max-w-5xl">
                <input
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter Website URL"
                    className="px-3 py-2 rounded-md border w-48"
                />
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter Username"
                    className="px-3 py-2 rounded-md border w-48"
                />
                <div className="relative w-48">
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        type={showFormPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-3 py-2 pr-10 rounded-md border"
                    />
                    <img
                        ref={imgRef}
                        onClick={togglePasswordVisibility}
                        src={showFormPassword
                            ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                            : "https://cdn-icons-png.flaticon.com/512/709/709612.png"}
                        alt="toggle"
                        className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Save
                </button>
            </form>
        </div>
    );
};

export default InputForm;
