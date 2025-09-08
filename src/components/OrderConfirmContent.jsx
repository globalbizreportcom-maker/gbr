'use client';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

const OrderConfirmContent = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('gbr_form');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    if (!formData) return <p className="text-sm text-gray-600">Loading...</p>;

    return (
        < div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left: Payment Section */}
                <div className="lg:col-span-8 bg-gray-50 p-6 border border-gray-200 rounded-xl">
                    <h2 className="text-xl font-semibold">Payment Summary</h2>
                    <h6 className="text-xs text-gray-600 mb-4 pb-4 border-b border-gray-300">
                        Make the payment through Paypal / Credit or Debit Card.
                    </h6>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead>
                                <tr className="border-b border-gray-200 text-left text-gray-500 uppercase text-xs tracking-wider">
                                    <th className="py-2 pr-4">Description</th>
                                    <th className="py-2 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="pt-4 pr-4 font-bold">Business Credit Report</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 pr-4 text-primary">{formData.companyName}</td>
                                    <td className="py-3 text-right text-base font-semibold">₹449.82</td>
                                </tr>
                                <tr className="border-t border-gray-300 font-semibold">
                                    <td className="py-3 pr-4 text-xl">Total Amount</td>
                                    <td className="py-3 text-right text-xl">₹449.82</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="btn btn-primary w-[120px]">Pay Now</button>
                    </div>

                    <h6 className="text-xs text-center text-gray-600 mb-4 pb-4 border-b border-gray-300 mt-5">WE ACCEPT</h6>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <img src="/images/payments/visa.png" alt="Visa" className="h-6 object-contain" />
                        <img src="/images/payments/mastercard.png" alt="Mastercard" className="h-6 object-contain" />
                        <img src="/images/payments/paypal.png" alt="PayPal" className="h-6 object-contain" />
                        <img src="/images/payments/amex.png" alt="Amex" className="h-6 object-contain" />
                        <img src="/images/payments/rupay.png" alt="Rupay" className="h-6 object-contain" />
                        <img src="/images/payments/upi.png" alt="UPI" className="h-6 object-contain" />
                    </div>
                </div>

                {/* Right: Billing Summary */}
                <div className="lg:col-span-4 p-6 border border-gray-200 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold">Billing Detail</h3>
                    <h6 className="text-xs mb-4 pb-4 border-b border-gray-300">Billing info solely for payment, not shared.</h6>

                    <table className="w-full text-sm text-left text-gray-800 border-separate border-spacing-y-2">
                        <tbody>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Name</td>
                                <td className="py-2 text-right">{formData.contactName}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Company</td>
                                <td className="py-2 text-right">{formData.contactCompany}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold" >Country</td>
                                <td className="py-2 text-right">{formData.contactCountry?.label}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Email</td>
                                <td className="py-2 text-right">{formData.contactEmail}</td>
                            </tr>
                            <tr className="border-b border-gray-200 font-medium">
                                <td className="py-2 pr-4 font-semibold">Telephone</td>
                                <td className="py-2 text-right">{formData.contactPhone}</td>
                            </tr>
                        </tbody>
                    </table>


                    <p className="text-xs text-black mt-4 p-4 border border-green-200 bg-green-100 rounded-lg text-center">
                        You will receive freshly investigated business credit report on your email within the expected delivery time of 1–3 business days.
                    </p>
                </div>
            </div>

            <div className='border border-gray-200 rounded-lg p-10 mt-10'>

                <h3 className='text-2xl font-semibold'>Your Order Information</h3>

                <div className="collapse rounded-lg mt-10" >
                    <input type="checkbox" />

                    <div className="collapse-title flex justify-between items-center font-semibold text-base bg-gray-100 py-5">
                        <div>
                            <span className='text-2xl'>{formData.companyName}</span>
                        </div>
                        <FaEye className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="collapse-content">
                        <div className="overflow-x-auto">
                            <table className="table table-md border-0 uppercase">
                                <tbody >
                                    <tr className='border-b-gray-200 '>
                                        <td className="font-bold">COMPANY NAME</td>
                                        <td align='right'>{formData.companyName}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>
                                        <td className="font-bold">ADDRESS</td>
                                        <td align='right'>{formData.address}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">CITY</td>
                                        <td align='right'>{formData.city}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">STATE</td>
                                        <td align='right'>{formData.state?.label}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>

                                        <td className="font-bold">COUNTRY</td>
                                        <td align='right'>{formData.country?.label}</td>
                                    </tr>
                                    <tr className='border-b-gray-200'>
                                        <td className="font-bold">POSTAL CODE</td>
                                        <td align='right'>{formData.postalCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div >

    );
};

export default OrderConfirmContent;
