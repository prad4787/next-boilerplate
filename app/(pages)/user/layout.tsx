"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./components/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ThemeToggle } from "./components/theme-toggle";
import { NavUser } from "./components/nav-user";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    // const { handleLogout } = useAuth();
    // const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

    // useEffect(() => {
    //     if (!isAuthenticated || !user || !token) {
    //         //   handleLogout();
    //         console.log("not authenticated");
    //         //   router.push("/auth/login");
    //     }
    // }, [isAuthenticated, user, token, handleLogout]);

    // if (!isAuthenticated || !user || !token) {
    //     return null; // or a loading spinner
    // }

    return (
        // <div className="relative flex h-screen">
        //   <AppSidebar />
        //   <main className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8">
        //     {children}
        //   </main>
        // </div>
        <>


            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            El Fund Management
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            Dashboard
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex items-center gap-2 px-4 ml-auto">
                            <NavUser user={{ name: "John Doe", email: "jdoe@me.com", avatar: "https://github.com/shadcn.png" }}  />
                            <ThemeToggle />
                        </div>
                    </header>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
