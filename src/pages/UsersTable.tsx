import { useEffect, useState } from "react";
import { User } from "../Model/UserModel";
import { useNavigate } from "react-router-dom";
import { DELETE, GET } from "../services/MasterService";
import { toast, ToastContainer } from "react-toastify";

export const UsersTable = () => {
    const [tableData, setTableData] = useState<User[]>([] as User[]);
    const navigate = useNavigate();
    const userData = async () => {
        const res = await GET();
        setTableData(res?.data);
    }
    const editForm = (userData: User) => {
        navigate(`/edit/${userData?.id}`)
    }
    const deleteData = async (data: User) => {
        const deleteData = await DELETE(data?.id);
        userData();
        toast.success("Employee delete successfull", {closeButton:false});
    }
    useEffect(() => {
        userData();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>IsActive</th>
                            {/* <th>Country</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.length > 0 && tableData?.map((item: User, index: number) => (
                            <tr key={item?.id}>
                                <td>{item?.id}</td>
                                <td>{item?.name}</td>
                                <td>{item?.email}</td>
                                <td>{item?.age}</td>
                                <td>{item?.isActive}</td>
                                {/* <td>{item?.country}</td> */}
                                <td>
                                    <button className="btn btn-info" onClick={() => editForm(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteData(item)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    )
}
