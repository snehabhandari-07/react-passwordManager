import React, { useRef, useState, useEffect } from 'react';
import InputForm from './InputForm';
import ShowTable from './ShowTable';

const Manager = () => {

    const imgRef = useRef();

    const [formData, setFormData] = useState({
        site: "",
        username: "",
        password: ""
    })

    const [passwordArray, setPasswordArray] = useState([]);

    const [showFormPassword, setShowFormPassword] = useState(false);

    const [visiblePasswords, setVisiblePasswords] = useState({});


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

    const toggleFormPasswordVisibility = () => {
        setShowFormPassword((prev) => (!prev));
    }

    const toggleVisiblePassword = (index) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    return (
        <>

            <InputForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                showFormPassword={showFormPassword}
                togglePasswordVisibility={toggleFormPasswordVisibility}
                imgRef={imgRef}
            />

            <ShowTable
                passwordArray={passwordArray}
                handleDelete={handleDelete}
                handleCopy={handleCopy}
                visiblePasswords={visiblePasswords}
                toggleVisiblePassword={toggleVisiblePassword}
            />
        </>
    )
}

export default Manager
