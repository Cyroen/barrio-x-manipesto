'use client'

import "@/app/styles/dashboard.scss"
import DashboardLayout from "./dashboard";
import Sidebar from "../comps/sidebar";


function DashboardMain(props) {
    return (
        <main className="main_" style={{minHeight: '100vh'}}>
            <Sidebar></Sidebar>
            <DashboardLayout></DashboardLayout>
        </main>
    );
}

export default DashboardMain;