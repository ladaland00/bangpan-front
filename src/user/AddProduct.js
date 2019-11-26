import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiUser";
import { readUser } from "../auth/index";

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddProduct = props => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        categories: [],
        category: "",
        ownername: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const {
        name,
        description,
        categories,
        category,
        ownername,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });

    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };
   
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    loading: false,
                    createdProduct: data.name,
                    formData: new FormData(),
                });
            }
        });
    };

    const newPostForm = () => (
        <Form className="mb-3" onSubmit={clickSubmit}>
            <br />
            <FormGroup row>
                <Label for="name" sm={3}>ชื่อสินค้า</Label>
                <Col sm={9}>
                    <Input onChange={handleChange("name")}
                        type="text"
                        className="form-control"
                        value={name}
                        required />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleFile" sm={3}>เพิ่มรูปภาพ</Label>
                <Col sm={9}>
                    <Input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                        required />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={3}>รายละเอียดสินค้า</Label>
                <Col sm={9}>
                    <Input onChange={handleChange("description")}
                        type="textarea"
                        className="form-control"
                        value={description}
                        required />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSelect" sm={3}>Category</Label>
                <Col sm={9}>

                    <Input type="select" onChange={handleChange("category")} className="form-control" required>
                        <option>Please select</option>
                        {categories &&
                            categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}

                    </Input>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleSelect" sm={3}>ยืนยัน</Label>
                <Col sm={9}>
                    <Input
                        type="checkbox"
                        onChange={handleChange("ownername")}
                        className="form-control"
                        value={user._id} 
                        required>
                    </Input>
                    {/* {user._id} */}
                </Col>
            </FormGroup>
            <Button color="primary" size="ms" block>Submit</Button>
        </Form>


    );
    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            <h6>{error}</h6>
        </div>
    );
    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h6>{`${createdProduct}`} is created!</h6>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h5>Loading...</h5>
            </div>
        );
    useEffect(() => {
        init();
        setValues({ formData: new FormData() });
    }, []);

    return (
        <div className="row">
            <div className="col-lg-7 ">
                {/* {JSON.stringify(categories)} */}
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}

            </div>
        </div>
    );
};

export default AddProduct;