const HeroSection = () => {
    return (
        <div className=" flex flex-col justify-between bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10">

            {/* Top Content */}
            <div className=" w-full max-w-2xl mx-auto text-center mt-20">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
                    Order <span className="text-primary">Business Credit Report</span>  for any Company Worldwide.
                </h1>

                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Verify your Business Partners, Vendors, Buyers, Suppliers and more with GBR Reports. Check details on company's reliability, credibility, financial data, credit rating & more.
                </p>
            </div>

            {/* Bottom: Search */}
            <div className="w-full max-w-4xl mx-auto mt-10 px-2 mb-20">
                {/* Input: full width, flex-1 in md+ */}
                <div className="w-full mb-4 md:mb-0 md:flex md:gap-4">
                    <input
                        type="text"
                        placeholder="Enter company name"
                        className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Select + Button */}
                    <div className="flex w-full gap-4 mt-4 md:mt-0 md:w-auto md:gap-4">
                        <select
                            id="country"
                            className="w-1/2 md:w-48 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="india">India</option>
                            <option value="usa">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="germany">Germany</option>
                        </select>

                        <button className="btn btn-primary w-1/2 md:w-auto">
                            Search
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default HeroSection;
