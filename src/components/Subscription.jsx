
const Subscription = () => {
    return (
        <section
            className="py-16 bg-cover bg-center px-2" >

            <div className="max-w-5xl mx-auto rounded-xl p-16 px-8 text-center bg-center bg-cover" style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-vector/hexagonal-black-background-modern-design_1017-37442.jpg')",
            }}>
                <h2 className="text-2xl md:text-4xl font-semibold text-white mb-2">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-zinc-300 mb-6 max-w-md mx-auto text-sm">
                    Subscribe to Our Newsletter Stay up-to-date with the latest news and happenings.
                </p>

                <form className="flex flex-row justify-center items-stretch w-full max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary px-6 py-2 rounded-r-xl"
                    >
                        Subscribe
                    </button>
                </form>



                <p className="text-xs text-zinc-400 mt-4">
                    We respect your privacy and won't share your email address.
                </p>
            </div>
        </section>



    )
}

export default Subscription