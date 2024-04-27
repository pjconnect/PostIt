import React from "react";
import moment from "moment";
import {handleApiErrors} from "../HelperMethods";
import ApiService from "../ApiService";
import toast from "react-hot-toast";

export default function ({imageUrl, createdDate, username, description, postId}) {
    var apiService = new ApiService();
    
    function deletePost(){
        try {
            let res = apiService.deletePost(postId) 
            toast("deleted");
        }catch (ex){
            handleApiErrors(ex);
        }
    }
    
    return (
        <div>
            <div className="max-w-lg mx-auto bg-white shadow rounded-lg overflow-hidden p-3 mb-3">
                <div className="flex justify-between">
                    <div className="text-left">
                        <p className="text-gray-900 font-medium text-lg mr-3">{username}</p>
                    </div>
                    <div>
                        <div className="max-w-lg mx-auto">
                            <button className="bg-red-500 rounded text-sm p-1 text-white" onClick={deletePost}>Delete</button>
                        </div>
                    </div>
                </div>
                <div className="">
                    {imageUrl &&
                        <img className="w-full h-56 object-cover rounded object-center" src={imageUrl}
                             alt="Post Image"/>
                    }
                    <div className="mb-2">
                        <p className="text-gray-700 text-2xl">{description}</p>
                    </div>
                    <p className="text-gray-500 text-left text-sm">Posted
                        on {moment.utc(createdDate).format("MMMM DD, yyyy")}</p>
                </div>

            </div>
        </div>
    )
}