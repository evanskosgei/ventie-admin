import React, { useState } from "react";
import ALLImages from "../../common/imagesdata";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { CartData } from "../../common/ecommercedata";
import { Link } from 'react-router-dom';

const Cancelled_events = () => {
    const [allData, setAllData] = useState(CartData)
    function handleRemove(id) {
        const newList = allData.filter((idx) => idx.id !== id);
        setAllData(newList);
    }

    function dec(el) {
        let unit = el.currentTarget.parentElement.querySelector("input").value;

        if (Number(unit) === 0) {
            return false;
        } else {
            el.currentTarget.parentElement.querySelector("input").value--;
        }
    }
    function inc(el) {
        el.currentTarget.parentElement.querySelector("input").value++;
    }

    return (
        <div>
            <PageHeader currentpage="Cancelled Events" activepage="Events" mainpage="Cancelled Events" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-12">
                    <div className="box cart-full overflow-hidden">
                        <div className="box-body p-0">
                            <div className="overflow-auto">
                                <table className="ti-custom-table ti-custom-table-head">
                                    <thead className="">
                                        <tr>
                                            <th scope="col" className="!text-sm !p-4 !text-gray-800 dark:!text-white">Event</th>
                                            <th scope="col" className="!text-sm !p-4 !text-gray-800 dark:!text-white">Price (Each) </th>
                                            <th scope="col" className="!text-sm !p-4 !text-gray-800 dark:!text-white">Discount</th>
                                            <th scope="col" className="!text-sm !p-4 !text-gray-800 dark:!text-white">Total</th>
                                            <th scope="col" className="!text-end !text-sm !p-4 !text-gray-800 dark:!text-white">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((idx) => (
                                            <tr className="cart-box" key={Math.random()}>
                                                <td className="flex">
                                                    <img className="avatar avatar-lg rounded-sm bg-gray-100 dark:bg-black/20 p-1" src={idx.src} alt="Image Description" />
                                                    <div className="ltr:ml-3 rtl:mr-3">
                                                        <span className="block text-sm font-semibold text-gray-800 dark:text-white max-w-[200px] truncate">{idx.title}</span>
                                                        <span className="block text-sm text-gray-600 dark:text-white/70">{idx.color} Color</span>
                                                        <span className="block text-sm text-gray-600 dark:text-white/70">Size : {idx.size}</span>
                                                    </div>
                                                </td>
                                                <td>{idx.price}</td>
                                                <td>{idx.discount}</td>
                                                <td>{idx.total}</td>
                                                <td className="text-end font-medium">
                                                    <div className="hs-tooltip ti-main-tooltip">
                                                        <Link to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/wishlist/`} className="hs-tooltip-toggle w-10 h-10 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
                                                            <i className="ti ti-heart"></i>
                                                            <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip"> Save To Whislist</span>
                                                        </Link>
                                                    </div>
                                                    <div className="hs-tooltip ti-main-tooltip">
                                                        <Link to="#" className="cart-btn hs-tooltip-toggle w-10 h-10 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger" onClick={() => handleRemove(idx.id)}>
                                                            <i className="ti ti-trash"></i>
                                                            <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip"> Delete </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cancelled_events;