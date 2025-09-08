import OrderCreditReport from '@/components/OrderCreditReport'
import React from 'react'

const OrderCreditReportPage = () => {
    return (
        <section className="py-8 px-1 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3">

                <h2 className="text-xl md:text-xl font-bold mb-6 text-center">
                    Order Freshly Investigated Credit Report of Your Business Partners, Suppliers, Buyers, Customers or Order a Self-Assessment Report for your Own Company.
                </h2>
                <h2 className="text-xl md:text-xl font-bold mb-6 text-center">
                    Lowest Pay-per-Report Pricing. <span className="text-primary">Worldwide Coverage in 220+ Countries.</span>
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                    All International Reports Delivered in 1-3 Business Days
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        "Trusted by 20,000+ Global Companies",
                        "25,000+ Reports Delivered Monthly",
                        "Lowest Prices @ All Countries",
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-200 rounded-md bg-grey-50 p-2 text-center border-l-4 border-l-primary "
                        >
                            <h4 className="font-small text-sm md:text-sm">{service}</h4>
                        </div>
                    ))}
                </div>

            </div>

            <div className="max-w-5xl mx-auto">
                <OrderCreditReport />
            </div>
        </section>
    )
}

export default OrderCreditReportPage