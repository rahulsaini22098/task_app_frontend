import React from "react";
import style from './style.module.css'
import { FaUser } from 'react-icons/fa'
import axios from "axios";

const NavBar = () => {

    const changePictureHandler = (e: { target: HTMLInputElement }) => {
        const file = e.target.files?.[0]
        
        if(file){
            const formData = new FormData()
            formData.set('profile_picture', file, file.name)
            axios.post('/upload/picture', formData, {
                headers: {
                    "content-type": 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }

    return (
        <div className={style.navbar_container}>
            <div className={style.user_profile_image}>
                <FaUser />
                <input
                    className={style.input_upload_file}
                    type="file"
                    accept="image/*"
                    onChange={(e) => changePictureHandler(e)}
                />
            </div>
        </div>
    )
}


export default NavBar