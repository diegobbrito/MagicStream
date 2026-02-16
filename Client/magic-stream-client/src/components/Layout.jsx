import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main style={{ width: '100%', minHeight: '100vh', padding: '20px 0' }}>
            <div className='container'>
                <Outlet/>
            </div>
        </main>
    )
}
export default Layout