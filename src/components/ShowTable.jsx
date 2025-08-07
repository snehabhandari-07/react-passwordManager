import React from 'react';

const ShowTable = ({ passwordArray, handleDelete, handleCopy, visiblePasswords, toggleVisiblePassword }) => {
    return (
        <div className="flex justify-center mt-12 px-4 w-full">
            <div className="w-full max-w-5xl overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="py-2 px-4">Site</th>
                            <th className="py-2 px-4">Username</th>
                            <th className="py-2 px-4">Password</th>
                            <th className="py-2 px-4"></th>
                            <th className="py-2 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwordArray.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                    No passwords saved.
                                </td>
                            </tr>
                        ) : (
                            passwordArray.map((item, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="py-2 px-4"><a href={item.site} target="_blank" rel="noreferrer">{item.site}</a></td>
                                    <td className="py-2 px-4">{item.username}</td>
                                    <td className="py-2 px-4 flex items-center gap-2">
                                        {visiblePasswords[index] ? item.password : '********'}
                                        <img
                                            src={visiblePasswords[index]
                                                ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                                                : "https://cdn-icons-png.flaticon.com/512/709/709612.png"}
                                            alt="toggle"
                                            className="w-4 h-4 cursor-pointer"
                                            onClick={() => toggleVisiblePassword(index)}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleCopy(item.password)} className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                                            Copy
                                        </button>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-1 rounded text-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowTable;
