import React from 'react'

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-zinc-100 px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-primary mb-6">About Global Biz Report (GBR)</h1>

                <div className="prose max-w-none text-base-content">
                    <p className='text-black'>
                        <strong>Global Biz Report (GBR)</strong> is your go-to platform for accessing detailed business credit reports for companies worldwide. We help you verify your business partners, vendors, clients, and suppliers to ensure you're making informed decisions.
                    </p>
                    <p className='text-black'>
                        With GBR, you gain insights into a company's financials, credit score, operational history, and risk factors. Whether you're onboarding a new vendor or exploring investment opportunities, GBR gives you the confidence to proceed.
                    </p>
                    <p className='text-black'>
                        Our platform is designed for modern businesses, providing fast, reliable, and verified reports across multiple regions and industries.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="card bg-zinc-200 shadow-xs">
                        <div className="card-body">
                            <h2 className="card-title text-primary">Our Mission</h2>
                            <p className='text-black'>
                                To empower global businesses with transparent, accurate, and actionable credit insights, fostering trust and secure transactions.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-zinc-200 shadow-xs">
                        <div className="card-body">
                            <h2 className="card-title text-primary">Why GBR?</h2>
                            <p className='text-black'>
                                We aggregate data from trusted sources and global databases to deliver real-time business reports with unmatched clarity and speed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
