'use client'

import styles from './image-picker.module.css'
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickImage() {
        imageInput.current.click();
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.controls}>
            <div className={styles.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image picked by the user" fill/>}
            </div>
            <input className={styles.input}
                   type="file"
                   id={name}
                   accept="image/png, image/jpeg"
                   name={name}
                   ref={imageInput}
                   onChange={handleImageChange}
            />
            <button className={styles.button} type="button" onClick={handlePickImage}>
                Pick an Image
            </button>
        </div>
    </div>
}