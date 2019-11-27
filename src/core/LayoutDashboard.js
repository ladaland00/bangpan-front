import React, { Fragment } from "react";
import { isAuthenticated } from "../auth";


const AdminDashboard = ({
    id,
    children
}) => {
    const { user: { _id, username, firstname, lastname, email, address, phone, role }
    } = isAuthenticated();
    return (
        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-lg-2 ">
                        <div class="profile-work">
                            <a>บัญชีของฉัน</a><br />
                            {role === 1 && (<Fragment>
                                <a href="/admin/dashboard">ข้อมูลส่วนตัว</a><br />
                                <a href="/admin/history">history</a><br />
                                <a href="/create/category">category</a><br />
                            </Fragment>
                            )}
                            {role === 0 && (<Fragment>
                                <a href="/user/dashboard">ข้อมูลส่วนตัว</a><br />
                                <a href="/user/orders">history</a><br />
                                <a href="/create/product">Upload Product</a><br />
                            </Fragment>
                            )}

                        </div>
                    </div>
                    <div class="col-lg-10 ">
                        <div class="new-profile-work ">
                            <div class="row-md-4">
                                <h4>{firstname}  {lastname}</h4>
                                {role === 1 ? "Admin" : "Registered User"}
                                <br />
                                <br />
                                <div class="row-md-8"><div id={id}>{children}</div>  </div>


                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminDashboard;