'use client'

import { useEffect, useState } from "react";

export default function useBrowserStatus() {

    if(typeof window !== undefined) {
        const [isOnline, setIsOnline] = useState<boolean>(window?.navigator.onLine || false)
    
        useEffect(()=>{
            window.addEventListener('online',() => {
                setIsOnline(true)
            });
            window.addEventListener('offline',()=>{
                setIsOnline(false)
            })
        },[])
    
        return isOnline 
    }
}