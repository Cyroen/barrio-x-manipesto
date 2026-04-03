'use client'

import "@/app/styles/dashboard.scss"
import UploadPage from "./upload_page";
import Sidebar from "../comps/sidebar";


function UploadMain(props) {
    return (
        <main className="main_" style={{minHeight: '100vh'}}>
            <Sidebar></Sidebar>
            <UploadPage></UploadPage>
        </main>
    );
}

export default UploadMain;