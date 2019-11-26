import React from "react";
import Menu from "./Menu";

const Layout = ({
    className,
    children
}) => (
        <div>
            <Menu />
            <div className={className}>{children}</div>
        </div>
    );

export default Layout;