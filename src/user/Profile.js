import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import Info from "../core/LayoutDashboard";

const Profile = ({ match }) => {

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { 
        firstname,
        lastname,
        email,
        username,
        password,
        address,
        phone, 
        error, 
        success 
    } = values;

    const init = userId => {
        console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values,    
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    address: data.address,
                    phone: data.phone, 
                    });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {
            firstname,
            lastname,
            email,
            username,
            password,
            address,
            phone }).then(
            data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: data.email,
                            username: data.username,
                            address: data.address,
                            phone: data.phone,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (
        firstname,
        lastname,
        email,
        username,
        password,
        address,
        phone) => (
        <form>
            <div className="form-group">
                <label className="text-muted">LsatName</label>
                <input
                    type="text"
                    onChange={handleChange("firstname")}
                    className="form-control"
                    value={firstname}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">FirstName</label>
                <input
                    type="text"
                    onChange={handleChange("lastname")}
                    className="form-control"
                    value={lastname}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                    type="text"
                    onChange={handleChange("username")}
                    className="form-control"
                    value={username}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Address</label>
                <input
                    type="text"
                    onChange={handleChange("address")}
                    className="form-control"
                    value={address}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Phone</label>
                <input
                    min="9" 
                    max="10"
                    type="number"
                    onChange={handleChange("phone")}
                    className="form-control"
                    value={phone}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Profile"
        >
                        <Info id="Content" >

            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(        
                firstname,
                lastname,
                email,
                username,
                password,
                address,
                phone)}
            {redirectUser(success)}
            </Info>
        </Layout>
    );
};

export default Profile;