import LoginForm from "@/utils/LoginForm";

export default function LoginPage() {

    return (
        <section className="max-w-6xl py-10 px-2 bg-white text-gray-800 mx-auto">

            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">

                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto uppercase">
                    Login
                </div>

                <h2 className=" max-w-2xl mx-auto text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="text-primary">Welcome Back.</span>  Let's Login to your Account.
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Welcome back! Please login to your admin account to manage dashboards, services and more.
                </p>
            </div>

            <div className="w-full mx-auto grid md:grid-cols-2 gap-12 items-start">


                <div className="grid gap-6 md:grid-cols-1 bg-white p-6 md:p-10 rounded-2xl  order-2 md:order-1">

                    <img
                        src="https://img.freepik.com/free-photo/beautiful-biophilic-scene_23-2151897506.jpg?uid=R133306793&ga=GA1.1.1773690977.1730112906&semt=ais_hybrid&w=740"
                        alt="About Global Biz Report"
                        className="w-full h-[400px] object-cover rounded-xl"
                    />
                    {/* Right Content */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl md:text-xl font-bold mb-2">
                            Need assistance? We are here to help.
                        </h2>
                        <p className="text-gray-400 text-sm mb-10 max-w-md">
                            Please send us your message and we would be happy to help you.
                        </p>

                    </div>

                </div>

                {/* Right: Contact Form */}
                <div className="  rounded-xl shadow-xs p-8 order-1 md:order-2" >
                    <h3 className="text-xl text-primary font-semibold mb-6">
                        Login
                    </h3>

                    <LoginForm />

                </div>

            </div>
        </section>
    );
}

export const metadata = {
    title: "Login | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Login GBR",
        description: "What we do at Global Biz Report.",
        url: "https://yourdomain.com/about",
        siteName: "Global Biz Report",
        type: "website",
    },
};

