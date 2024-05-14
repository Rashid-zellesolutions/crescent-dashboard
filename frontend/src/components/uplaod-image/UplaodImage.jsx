import axios from 'axios';
import React, { useState } from 'react'

const UplaodImage = () => {
    const [files, setFiles] = useState()
    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.values(files).forEach(file => {
            formData.append('file', file);
        })
        try {
            const res = await axios.post('http://localhost:5000/uploads', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type='file' id='file' name='uplaodImages' multiple onChange={(e) => setFiles(e.target.files)} />
            <button onClick={onSubmit}> click </button>
        </form>
    </div>
  )
}

export default UplaodImage