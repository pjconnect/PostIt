import React from 'react';
import {ScrollFeed} from "../components/ScrollFeed";
import AddFeed from "../components/AddFeed";

export function Home() {
    return (
        <div>
            <div className="p-1 w-full">
                <AddFeed/>
            </div>
            <ScrollFeed/>
        </div>
    )
}
