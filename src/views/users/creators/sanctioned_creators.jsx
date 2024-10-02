import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import mtaApi from "../../../api/mtaApi";
import { Success, Error } from "../../../components/toasts";

const Sanctioned_creators = () => {
    const [allData, setAllData] = useState([]);
    const [creatorCount, setCreatorCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch_sanctioned_creators = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await mtaApi.creators.fetch_creators({ info_type: 4 });
            if (data.status === '200') {
                setAllData(data.creator);
                setCreatorCount(data.unverified_creator_count);
            } else {
                throw new Error(data.message || 'Failed to fetch unverified creators');
            }
        } catch (error) {
            // console.error("Error fetching unverified creators:", error);
            setError(error.response.data.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetch_sanctioned_creators();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="ti-spinner text-primary" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={fetch_sanctioned_creators}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }
    return (
        <div>
            <PageHeader currentpage="Sanctioned Creators" activepage="Creators" mainpage="Sanctioned Creators" />
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h5 className="box-title my-auto">List Of Sanctioned Creators</h5>
                </div>
                <div className="box-body">
                    {allData.length > 0 ? (
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
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Sanctioned Creators</h3>
                            <p className="text-gray-500 dark:text-gray-400">There are currently no Sanctioned creators in the system.</p>
                        </div>
                    )}
                    {allData.length > 0 && (
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sanctioned_creators