// src/app/(site)/pdfs/[country]/page.jsx

export default async function CountryReport({ params }) {
    // 1️⃣ Await the params (Required in Next.js 15+)
    const resolvedParams = await params;
    const country = resolvedParams.country;

    // 2️⃣ Define the path to your public folder PDF
    // Ensure your files are named exactly like the URL (e.g., india.pdf)
    const pdfPath = `/pdfs/${country + `-sample-report`.toLowerCase()}.pdf`;

    return (
        <div className="flex flex-col h-screen w-full bg-gray-100">
            {/* Header / Navigation */}
            <div className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-900">
                    Business Report: {country.toUpperCase()}
                </h1>
                <a
                    href={pdfPath}
                    download
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                    Download PDF
                </a>
            </div>

            <div className="flex-grow w-full overflow-hidden">
                <iframe
                    src={`${pdfPath}#toolbar=0`} // #toolbar=0 hides the default browser UI if supported
                    className="w-full h-full border-none"
                    title={`${country} Business Report`}
                />
            </div>
        </div>

    );
}