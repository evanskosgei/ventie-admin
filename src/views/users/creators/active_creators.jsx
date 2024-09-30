import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { ProductList } from "../../../common/ecommercedata";
import mtaApi from "../../../api/mtaApi";

const Active_creators = () => {
    const [allData, setAllData] = useState([])
    const [creatorCount, setCreatorCount] = useState(0);

    const fetch_active_creators = async () => {
        try {
            const { data } = await mtaApi.creators.fetch_creators({ info_type: 2 });
            if (data.status === '200') {
                setAllData(data.unverified_creator);
                setCreatorCount(data.unverified_creator);
            } else {
                throw new Error(data.message || 'Failed to fetch creators');
            }
        } catch (error) {
            console.error("Error fetching creators:", error);
        }
    };

    useEffect(() => {
        fetch_active_creators();
    }, []);
    function handleRemove(id) {
        const newList = allData.filter((idx) => idx.id !== id);
        setAllData(newList);
    }



    return (
        <div>
            <PageHeader currentpage="Active Creators" activepage="Creators" mainpage="Active Creators" />
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h5 className="box-title my-auto">List Of Active Creators</h5>
                </div>
                <div className="box-body">
                    <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        <table className="ti-custom-table ti-custom-table-head edit-table">
                            <thead className="bg-gray-100 dark:bg-black/20">
                                <tr className="">
                                    <th scope="col" className="dark:text-white/70">Creators ID No.</th>
                                    <th scope="col" className="dark:text-white/70">Creators Image</th>
                                    <th scope="col" className="dark:text-white/70">Creators Name</th>
                                    <th scope="col" className="dark:text-white/70">Creators Address No.</th>
                                    <th scope="col" className="dark:text-white/70">ID Front</th>
                                    <th scope="col" className="dark:text-white/70">ID Back</th>
                                    <th scope="col" className="dark:text-white/70">Status</th>
                                    <th scope="col" className="!text-end dark:text-white/70">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((idx) => (
                                    <tr className="product-list" key={Math.random()}>
                                        <td className="font-semibold">{idx.idNumber}</td>
                                        <td>
                                            <div className="flex space-x-3 rtl:space-x-reverse">
                                                <img className="avatar avatar-sm rounded-sm bg-gray-100 dark:bg-black/20 p-1"
                                                    src={idx.profileImage} alt="Image Description" />
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-white my-auto truncate lg:max-w-[100px]">
                                                    Profile</span>
                                            </div>
                                        </td>
                                        <td>{idx.fullName}</td>
                                        <td>{idx.address}</td>
                                        <td>
                                            <div className="flex space-x-3 rtl:space-x-reverse">
                                                <img className="avatar avatar-sm rounded-sm bg-gray-100 dark:bg-black/20 p-1"
                                                    src={idx.idFrontImage} alt="Image Description" />
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-white my-auto truncate lg:max-w-[100px]">
                                                    Front</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex space-x-3 rtl:space-x-reverse">
                                                <img className="avatar avatar-sm rounded-sm bg-gray-100 dark:bg-black/20 p-1"
                                                    src={idx.idBackImage} alt="Image Description" />
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-white my-auto truncate lg:max-w-[100px]">
                                                    Back</span>
                                            </div>
                                        </td>
                                        <td>{idx.status}</td>
                                        <td className="text-end font-medium">
                                            <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}users/creators/new/details/${idx._id}`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-warning">
                                                <i className="ti ti-eye"></i>
                                            </Link>
                                            {/* <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/editproduct/`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
                                                <i className="ti ti-pencil"></i>
                                            </Link>
                                            <Link aria-label="anchor" to="#" className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger" onClick={() => handleRemove(idx.id)}>
                                                <i className="ti ti-trash"></i>
                                            </Link> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav className="flex justify-end items-center space-x-2 rtl:space-x-reverse mt-5">
                        <Link className="w-10 h-10 bg-transparent text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center text-sm font-medium items-center gap-2 rounded-full"
                            to="#">
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                        <Link className="w-10 h-10 bg-primary text-white p-2 inline-flex items-center justify-center text-sm font-medium rounded-full"
                            to="#" aria-current="page">1</Link>
                        <Link className="w-10 h-10 bg-transparent text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center items-center text-sm font-medium rounded-full"
                            to="#">2</Link>
                        <Link className="w-10 h-10 bg-transparent text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center items-center text-sm font-medium rounded-full"
                            to="#">3</Link>
                        <Link className="w-10 h-10 bg-transparent text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center text-sm font-medium items-center gap-2 rounded-full"
                            to="#">
                            <span className="sr-only">Next</span>
                            <span aria-hidden="true">»</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Active_creators;