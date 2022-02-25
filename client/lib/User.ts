import axios from "axios";

export const uploadAvatar = async ({ imageBlob, uploadPreset, token }: { imageBlob: Blob, uploadPreset: string, token: string }) => {

    const { data } = await uploadCloudinary({ imageBlob, uploadPreset })
    return await uploadAviDB({ url: data.url, token })

}

const uploadCloudinary = async ({ imageBlob, uploadPreset }: { imageBlob: Blob, uploadPreset: string }) => {
    const formData = new FormData()
    formData.append("file", imageBlob)
    formData.append("upload_preset", uploadPreset)

    return await axios.post("https://api.cloudinary.com/v1_1/pablo-padilla/image/upload", formData)
}

const uploadAviDB = async ({ url, token }: { url: string, token: string }) => {

    const userData = new FormData();
    userData.append("avatar", url)

    const headers = {
        "X-Auth-Token": token,
        "content-type": "application/json"
    }

    return await axios.post("http://localhost:5000/users/avatar", userData, { headers: headers });

}
