import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User } from '../Model/UserModel';
import { ADD, GET, UPDATE } from '../services/MasterService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
export const UsersForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { userId } = params;
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>({} as User);

    const initialValues = {
        name: "",
        email: "",
        age: null,
        country: "",
        isActive: 0,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
        isActive: Yup.number().oneOf([0, 1], "Must be either 0 or 1"), // Validate it's either 0 or 1
        age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
        // country: Yup.string().required("Country is required"),
    });
    const handleSubmit = async (values: User) => {
        if (!isEditing) {
            console.log("FALSE", values)
            const res = await ADD(values);
            if (res?.status === 201 || res?.status === 200) {
                    toast.success("User Added Successfully");
                    navigate('/');
            } else {
                toast.error("Something went wrong");
            }
        } else {
            console.log("TRUE", values)
            const res = await UPDATE(values);
            if (res?.status === 201 || res?.status === 200) {
                    toast.success("User Updated Successfully");
                    navigate('/');
            } else {
                toast.error("Something went wrong");
            }
        }

    };
    const getUserByID = async () => {
        const data = await GET(userId);
        setUserData(data?.data);
    }
    useEffect(() => {
        if (userId) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
        getUserByID();
    }, [userId])
    // const toaster = () => {
    //     toast.success("TOASTER");
    // }
    return (
        <>
            {/* <button className="btn btn-primary" onClick={toaster}>toast</button> */}
            <div className="d-flex mt-5">
                <div className="card m-auto w-50">
                    <div className="card-body">
                        <h3 className="my-2 text-center">{!isEditing ? "Add Form" : "Update Form"}</h3>
                        <Formik
                            initialValues={{ ...initialValues, ...userData }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className="form-group my-2">
                                        <label className="label">Name</label>
                                        <Field type="text" name="name" className='form-control' />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label className="label">Email</label>
                                        <Field type="email" name="email" className='form-control' />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label className="label">Age</label>
                                        <Field type="number" name="age" className='form-control' />
                                        <ErrorMessage name="age" component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group my-2">
                                        <label className="label">Is Active</label>
                                        <br />
                                        <Field
                                            type="checkbox"
                                            name="isActive"
                                            className="form-check-input"
                                            checked={values.isActive === 1}
                                            onChange={(e: any) => {
                                                setFieldValue("isActive", e.target.checked ? 1 : 0);
                                            }}
                                        />
                                    </div>
                                    {/* <div className="form-group my-2">
                                    <label className="label">Country</label>
                                    <Field type="text" name="country" className='form-control' />
                                    <ErrorMessage name="country" component="div" className="text-danger" />
                                </div> */}
                                    <div className="form-group my-2">
                                        <button type='submit' className="btn btn-primary form-control">{!isEditing ? "ADD" : "UPDATE"}</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};
