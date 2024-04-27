import React, {useRef, useState} from "react";
import {Input} from "reactstrap";
import ApiService from "../ApiService";
import {handleApiErrors} from "../HelperMethods";
import toast from "react-hot-toast";

export default function AddFeed() {
    const refTextArea = useRef<HTMLTextAreaElement>();
    const refFileUpload = useRef<Input>();
    const apiService = new ApiService();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const temporaryUrl = URL.createObjectURL(file);
            setImageUrl(temporaryUrl);
        }
    };

    const handlePost = async () => {
        setLoading(true);
        const formData = new FormData();
        let name = "";
        
        if (selectedFile) {
            formData.append('file', selectedFile);
            const result = await apiService.uploadFeedImage(formData);
            name = result.data.imageUrl;
        }
        
        try {
            await uploadFeedCore(name);
            toast("Posted!", {icon: "🔥"})
        } catch (ex) {
            handleApiErrors(ex);
        } finally {
            setLoading(false);
        }

        async function uploadFeedCore(imageUrl = "") {
            try {
                await apiService.addFeed({description: refTextArea.current.value, imageUrl: imageUrl})
                resetForm();
            } catch (ex) {
                handleApiErrors(ex);
            }
        }
    };

    function resetForm() {
        refTextArea.current.value = "";
        refTextArea.current.style.height = 'auto';
        setImageUrl("")
        setSelectedFile(null);
        refFileUpload.current.value = null;
    }

    return (
        <div className="max-w-lg flex items-stretch mx-auto justify-center">
            <div className="flex-grow position-relative">
                <textarea ref={refTextArea}
                          className="border border-gray-300 rounded-lg p-3 min-h-24 w-full border-red-300 transition-all"
                          placeholder="Write something..."
                          onBlur={() => {
                              if (refTextArea.current.value) {
                                  return;
                              }
                              console.log("out")
                              refTextArea.current.style.height = '24px';
                          }}
                          onClick={() => {
                              refTextArea.current.style.height = '300px';
                          }}>
                </textarea>
                <div className="position-absolute bottom-2 left-5">
                    <label htmlFor="file-upload"
                           className="cursor-pointer">
                        {/*<i className="bi bi-camera2 "></i>*/}
                        <i className="bi bi-camera text-3xl"></i>
                    </label>
                </div>
                <div className="position-absolute bottom-3 right-2">
                    {loading ? "Uploading..." : <button
                        className="bg-blue-950 text-white ml-3 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-900"
                        onClick={handlePost}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                    }
                </div>
            </div>
            <input id="file-upload" ref={refFileUpload} onChange={handleFileChange} type="file" className="hidden"/>
            {imageUrl &&
                <img src={imageUrl} className="rounded absolute right-3 bottom-5" alt="Selected"
                     style={{maxWidth: '200px', maxHeight: '200px'}}/>
            }
        </div>
    )
}