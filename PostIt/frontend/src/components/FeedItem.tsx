import React, {useRef, useState} from "react";
import moment from "moment";
import {handleApiErrors} from "../HelperMethods";
import ApiService from "../ApiService";
import {AxiosResponse} from "axios";

export default function FeedItem({postId, imageUrl, createdDate, username, description, haveUserLiked, totalLikes}) {
    
    const [localLiked, setLocalLiked] = useState(haveUserLiked);
    const apiService = new ApiService();
    const refTotalLikes = useRef<HTMLSpanElement>();

    async function likePost(){
        try {
            if(localLiked){
                refTotalLikes.current.innerHTML = parseInt(refTotalLikes.current.innerHTML) - 1;
                apiService.unlikePost(postId);
                
            }else{
                refTotalLikes.current.innerHTML = parseInt(refTotalLikes.current.innerHTML) + 1;
                apiService.likePost(postId)
            }
            setLocalLiked(!localLiked);
        }catch (ex){
            // handleApiErrors(ex);
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
                        <button className={ "focus:outline-none" +  (localLiked ? " text-red-500" : " text-gray-500") }
                                onClick={() =>{
                                    likePost();
                                }}>
                            <span>
                              <i className="bi bi-fire text-3xl"></i>
                           </span>
                            <span ref={refTotalLikes}>{totalLikes}</span>
                        </button>
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