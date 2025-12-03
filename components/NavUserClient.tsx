"use client";

import { useEffect, useState } from "react";
import { NavUser } from "./nav-user";

type UserInfo = {
  username: string;
  email: string;
};

export function NavUserClient(){
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(()=>{
        const stored = localStorage.getItem("userInfo");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored) as UserInfo;
            setUserInfo(parsed);
            } catch (err) {
            console.error("Failed to parse userInfo from localStorage", err);
        }
    },[])

    if(!userInfo){
        return (
        <NavUser
        user={{
          name: "Unknown",
          email: "Unknown@mail.com",
          avatar: "/avatars/shadcn.jpg",
        }}
      />
        )
    }
    return (
        <NavUser
        user={{
            name: userInfo.username, // ★ 用 localStorage 里的 username
            email: userInfo.email,   // ★ 用 localStorage 里的 email
            avatar: "/avatars/shadcn.jpg",
        }}
        />
  );
    
}