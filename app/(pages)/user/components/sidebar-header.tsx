"use client"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";


const AppIconSvg = () => {
    return (
        <svg fill="#5449d3" xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" viewBox="0 0 100 100" version="1.1" xmlSpace="preserve" stroke="#5449d3"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M56.5,34h9.4c0.7,0,1.3-0.6,1.3-1.3c0-0.3-0.1-0.6-0.3-0.9L55.1,20.3c-0.3-0.2-0.6-0.3-0.9-0.3 c-0.7,0-1.3,0.6-1.3,1.3v9.2C53,32.4,54.6,34,56.5,34z"></path> <g> <path d="M38.6,65c0-3.5,2-6.6,5.2-7.8c2.6-1,5.2-1.6,8-1.6c4,0,7.4,1.1,10.5,2c1.7,0.5,3.3,1,4.8,1.3l0.2-18 c0-0.9-0.8-1.7-1.7-1.7H53c-3,0-5.2-2.4-5.2-5.2V21.7c0-0.9-0.8-1.7-1.8-1.7H28.2c-2.9,0-5.2,2.4-5.2,5.2v42c0,2.9,2.4,5.2,5.2,5.2 h10.4V65z"></path> </g> <path d="M72.4,64.9c-9.1,2.8-16.3-5.8-26.2-1.7c-0.8,0.3-1.2,1-1.2,1.8v10.4c0,1.4,1.2,2.2,2.4,1.8 c9.9-3,17,5.6,26.3,1.7c0.7-0.3,1.3-1,1.3-1.8V66.8C75,65.5,73.7,64.6,72.4,64.9z M60.3,74.6c-2.1,0-3.9-1.7-3.9-3.9 c0-2.1,1.7-3.9,3.9-3.9s3.9,1.7,3.9,3.9C64.2,72.9,62.5,74.6,60.3,74.6z"></path> </g></svg>
    )
}


export function SidebarHeader() {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
                <AppIconSvg />

                <span>El Fund Management</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}