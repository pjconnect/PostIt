import React, {useEffect, useState} from "react";
import ApiService from "../ApiService";
import {handleApiErrors} from "../HelperMethods";
import UserFeedItem from "../components/UserFeedItem";

export default function MyPosts() {
    const [items, setItems] = useState([]);
    const apiService = new ApiService();

    useEffect(() => {
        getAllMyPosts();
    }, [])

    async function getAllMyPosts() {
        try {
            let result = await apiService.getAllMyPosts(1, 1000);
            setItems(result.data.feed);
        }catch (ex){
            handleApiErrors(ex);
        }
    }

    return (
        <div>
            {items.map((i, index) => (
                <div key={index}>
                    <UserFeedItem imageUrl={i.imageUrl} createdDate={i.created} description={i.description}
                          username={i.user.username} postId={i.id}/>
                </div>
            ))}
        </div>
    )
}