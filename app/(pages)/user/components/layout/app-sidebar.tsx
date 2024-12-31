"use client"

import * as React from "react"
import {
    LayoutDashboardIcon,
    SquareTerminal,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavItem } from "@/types/nav"
import { NavMain } from "./nav-main"
import { SidebarHeader as AppSidebarHeader } from "./sidebar-header"
import {SidebarFooter as AppSidebarFooter } from "./sidebar-footer"

// This is sample data.
const navItems = [
    {
        title: "Dashboard",
        url: "auth/dashboard",
        icon: LayoutDashboardIcon,
        isActive: true,
    },
    {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "History",
                url: "#",
            },
            {
                title: "Starred",
                url: "#",
            },
            {
                title: "Settings",
                url: "#",
            },
        ],
    },

] as NavItem[]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* Logo and title  */}
                <AppSidebarHeader />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <AppSidebarFooter />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
