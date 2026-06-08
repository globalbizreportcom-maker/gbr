import { Calendar, Newspaper } from "lucide-react";

export default async function LatestUpdates({ companyData }) {
    let updates = [];

    if (!companyData) return null;

    try {
        // Post the company dataset down to avoid hitting Postgres a second time
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company-news`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ companyData }),
            next: { revalidate: 2592000 } // Keep the 24-hour cache guard active!
        });

        const result = await res.json();

        if (result.success) {
            updates = result.updates;
        }
    } catch (err) {
        console.log("Failed loading news timeline:", err);
    }

    if (updates.length === 0) return null;

    return (
        <section className="w-full bg-white rounded-2xl overflow-hidden mt-5 md:mt-0">
            {/* Corporate Header / Masthead */}
            <div className="bg-gray-50 border-b border-slate-100 p-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-200/60 shadow-sm shrink-0">
                            <Newspaper className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block mb-0.5">
                                Corporate Feed
                            </span>
                            <h2 className="text-sm font-bold tracking-tight text-slate-900 font-sans truncate">
                                Latest Updates & Market Briefs
                            </h2>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                Automated algorithmic record evaluation and dynamic journalism streams
                            </p>
                        </div>
                    </div>

                    {/* Optional: Right-aligned formal data status badge */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Verified
                    </div>
                </div>
            </div>

            {/* Timeline News Stream Content Container */}
            <div className="p-5 pl-5 bg-white">
                <div className="relative border-l-2 border-slate-100 space-y-6">
                    {[...updates].reverse().map((item, index) => {
                        const isLatest = index === 0;
                        return (
                            <div
                                key={index}
                                className="relative group pl-5 transition-all duration-200"
                            >
                                {/* Timeline Anchor Node */}
                                {isLatest ? (
                                    <span className="absolute -left-[7px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-orange-600 ring-4 ring-orange-100" />
                                ) : (
                                    <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-slate-300 group-hover:bg-slate-700 ring-4 ring-white transition-colors duration-150" />
                                )}

                                {/* Article Details Wrapper */}
                                <div className="flex flex-col justify-between">
                                    {/* Metadata Row */}
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                        {isLatest ? (
                                            <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.5 rounded font-extrabold shadow-sm shadow-orange-600/15 tracking-widest animate-pulse">
                                                Latest
                                            </span>
                                        ) : (
                                            <span className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-bold text-[9px] tracking-normal">
                                                Update
                                            </span>
                                        )}
                                        <span className="text-slate-300">•</span>
                                        <div className="flex items-center gap-1 font-semibold">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    {/* Headline */}
                                    <h4 className={`font-bold tracking-tight text-slate-600 group-hover:text-slate-700 duration-150 leading-snug ${isLatest ? "text-base font-extrabold" : "text-sm"
                                        }`}>
                                        {item.title}
                                    </h4>

                                    {/* Brief Excerpt Summary */}
                                    <p className={`text-slate-500 mt-1.5 leading-relaxed font-normal ${isLatest ? "text-xs" : "text-[11px]"
                                        }`}>
                                        {item.summary}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}