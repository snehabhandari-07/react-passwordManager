import React, { useRef, useState, useEffect } from 'react';

const Manager = () => {

    const imgRef = useRef();

    const [formData, setFormData] = useState({
        site: "",
        username: "",
        password: ""
    })

    const [passwordArray, setPasswordArray] = useState([]);

    const [showFormPassword, setShowFormPassword] = useState(false);

    useEffect(() => {
        try {
            const passwords = JSON.parse(localStorage.getItem("passwords"));
            if (Array.isArray(passwords)) {
                setPasswordArray(passwords);
            } else {
                setPasswordArray([]);
            }
        } catch (err) {
            console.error("Failed to parse localStorage:", err);
            setPasswordArray([]);
        }
    }, [])

    const showPassword = () => {
        // alert("Show Password");
        if (imgRef.current.src === "https://cdn-icons-png.flaticon.com/512/709/709612.png") {
            imgRef.current.src = "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
        } else {
            imgRef.current.src = "https://cdn-icons-png.flaticon.com/512/709/709612.png"
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = [...passwordArray, formData];
        setPasswordArray(updated);
        localStorage.setItem("passwords", JSON.stringify(updated));
        console.log(updated);
        setFormData({
            site: "",
            username: "",
            password: ""
        });
    }

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        setFormData(
            (prevFormData) => ({
                ...prevFormData, [e.target.name]: e.target.value
            })
        )
    }

    const handleDelete = (index) => {
        const updatedArray = passwordArray.filter((_, i) => i != index);
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }

    const handleCopy = (password) => {
        navigator.clipboard.writeText(password).then(() => (
            alert('Password copied to clipboard!')
        )).catch((err) => {
            console.error('Failed to copy:', err);
        })
    }

    const togglePasswordVisibility = () => {
        setShowFormPassword((prev) =>  (!prev));
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
            </div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
            </div>

            <div className='flex justify-center mt-12 px-4'>
                <p className='font-bold'>Your own Password Manager</p>
            </div>

            <div className="flex items-center justify-center mt-6 px-4">
                <form className="bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-lg flex flex-wrap gap-4 items-center justify-center w-full max-w-5xl">
                    <input
                        value={formData.site}
                        onChange={handleInputChange}
                        name="site"
                        type="text"
                        placeholder="Enter Website URL"
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                    />
                    <input
                        value={formData.username}
                        onChange={handleInputChange}
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                    />
                    <div className="relative w-48">
                        <input
                            value={formData.password}
                            onChange={handleInputChange}
                            name="password"
                            type={showFormPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-3 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span onClick={showPassword}>
                            <img
                                onClick={togglePasswordVisibility}
                                ref={imgRef}
                                src={showFormPassword
                                    ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png"
                                    : "https://cdn-icons-png.flaticon.com/512/709/709612.png"}
                                alt="toggle visibility"
                                className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            />
                        </span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md flex items-center gap-2 transition-colors">
                        <lord-icon
                            src="https://cdn.lordicon.com/egmlnyku.json"
                            trigger="hover"
                            colors="primary:white"
                            style={{ width: "24px", height: "24px" }} />
                        Save
                    </button>
                </form>


            </div>
            <div className="flex justify-center mt-12 px-4 w-full">
                <div className="w-full max-w-5xl overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-100 backdrop-blur-sm">
                            <tr>
                                <th className="py-2 px-4 text-left">Site</th>
                                <th className="py-2 px-4 text-left">Username</th>
                                <th className="py-2 px-4 text-left">Password</th>
                                <th className='py-2 px-4 text-left'></th>
                                <th className='py-2 px-4 text-left'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                                        No passwords saved yet.
                                    </td>
                                </tr>
                            ) : (
                                passwordArray.map((item, index) => (
                                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                        <td className="py-2 px-4"><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className="py-2 px-4">{item.username}</td>
                                        <td className="py-2 px-4">{item.password}</td>
                                        <td>
                                            <button onClick={() => handleCopy(item.password)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded transition-colors text-sm">
                                                Copy
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded transition-colors text-sm">
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


        </>
    )
}

export default Manager
