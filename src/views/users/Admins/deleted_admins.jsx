import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
import { ProductList } from "../../../common/ecommercedata";

const Deleted_admins = () => {
    const [allData, setAllData] = useState(ProductList)
    function handleRemove(id) {
        const newList = allData.filter((idx) => idx.id !== id);
        setAllData(newList);
    }

    const [isChecked, setIsChecked] = useState(true);

    const handleCheckAll = () => {
        const mailListElements = document.querySelectorAll('.mail-list');
        const mailCheckboxInputs = document.querySelectorAll('.mail-checkbox input');

        if (isChecked) {
            mailListElements.forEach((element) => {
                element.classList.add('selected');
            });

            mailCheckboxInputs.forEach((input) => {
                input.checked = true;
            });
        } else {
            mailListElements.forEach((element) => {
                element.classList.remove('selected');
            });

            mailCheckboxInputs.forEach((input) => {
                input.checked = false;
            });
        }

        setIsChecked(!isChecked);
    };
    return (
        <div>
            <PageHeader currentpage="Deleted Admins" activepage="Admins" mainpage="Deleted Admins" />
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h5 className="box-title my-auto">List Of Deleted Admins</h5>
                </div>
                <div className="box-body">
                    <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        <table className="ti-custom-table ti-custom-table-head edit-table">
                            <thead className="bg-gray-100 dark:bg-black/20">
                                <tr className="">
                                    <th scope="col" className="dark:text-white/70">Emp. No.</th>
                                    <th scope="col" className="dark:text-white/70">Emp. Name</th>
                                    <th scope="col" className="dark:text-white/70">Emp. Email</th>
                                    <th scope="col" className="dark:text-white/70">Date Created</th>
                                    <th scope="col" className="dark:text-white/70">Stock</th>
                                    <th scope="col" className="dark:text-white/70">Status</th>
                                    <th scope="col" className="dark:text-white/70">Date</th>
                                    <th scope="col" className="!text-end dark:text-white/70">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((idx) => (
                                    <tr className="product-list" key={Math.random()}>
                                        <td className="font-semibold">{idx.PdctID}</td>
                                        <td>
                                            <div className="flex space-x-3 rtl:space-x-reverse">
                                                <img className="avatar avatar-sm rounded-sm bg-gray-100 dark:bg-black/20 p-1"
                                                    src={idx.pdctsrc} alt="Image Description" />
                                                <span
                                                    className="block text-sm font-semibold text-gray-800 dark:text-white my-auto truncate lg:max-w-[100px]">
                                                    Shirts For Men</span>
                                            </div>
                                        </td>
                                        <td>{idx.category}</td>
                                        <td>{idx.price}</td>
                                        <td>{idx.stock}</td>
                                        <td>{idx.status}</td>
                                        <td>{idx.date}</td>
                                        <td className="text-end font-medium">
                                            <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productdetails/`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-warning">
                                                <i className="ti ti-eye"></i>
                                            </Link>
                                            <Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/editproduct/`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
                                                <i className="ti ti-pencil"></i>
                                            </Link>
                                            <Link aria-label="anchor" to="#" className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger" onClick={() => handleRemove(idx.id)}>
                                                <i className="ti ti-trash"></i>
                                            </Link>
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

export default Deleted_admins;