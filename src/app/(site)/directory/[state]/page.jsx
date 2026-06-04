import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cleanUrlSegment } from '@/utils/slugify';
import {
    ArrowRight,
    Building2,
    MapPin,
    Sprout,       // Agriculture
    Briefcase,    // Business Services
    Users,        // Community / Social Services
    HardHat,      // Construction
    Zap,          // Electricity / Gas / Water
    Coins,        // Finance
    ShieldCheck,  // Insurance
    Utensils,     // Food stuffs
    Layers,       // Leather / Textiles / Wood / Paper
    Cpu,          // Machinery
    FlaskConical, // Metals / Chemicals
    Factory,      // Manufacturing (Others)
    Pickaxe,      // Mining
    HelpCircle,   // Others
    Home,         // Real Estate
    Store,        // Trading
    Truck         // Transport / Communications
} from "lucide-react";

// The 19 fixed industry categories
const INDUSTRIES = [
    "Agriculture and Allied Activities",
    "Business Services",
    "Community, personal and Social Services",
    "Construction",
    "Electricity, Gas and Water companies",
    "Finance",
    "Insurance",
    "Manufacturing (Food stuffs)",
    "Manufacturing (Leather and products thereof)",
    "Manufacturing (Machinery and Equipments)",
    "Manufacturing (Metals and Chemicals, and products thereof)",
    "Manufacturing (Others)",
    "Manufacturing (Paper and Paper products, Publishing, printing and reproduction of recorded media)",
    "Manufacturing (Textiles)",
    "Manufacturing (Wood Products)",
    "Mining and Quarrying",
    "Others",
    "Real Estate and Renting",
    "Trading",
    "Transport, storage and Communications"
];

// Context-aware icon map matching the string items exactly
const INDUSTRY_ICONS = {
    "Agriculture and Allied Activities": Sprout,
    "Business Services": Briefcase,
    "Community, personal and Social Services": Users,
    "Construction": HardHat,
    "Electricity, Gas and Water companies": Zap,
    "Finance": Coins,
    "Insurance": ShieldCheck,
    "Manufacturing (Food stuffs)": Utensils,
    "Manufacturing (Leather and products thereof)": Layers,
    "Manufacturing (Machinery and Equipments)": Cpu,
    "Manufacturing (Metals and Chemicals, and products thereof)": FlaskConical,
    "Manufacturing (Others)": Factory,
    "Manufacturing (Paper and Paper products, Publishing, printing and reproduction of recorded media)": Layers,
    "Manufacturing (Textiles)": Layers,
    "Manufacturing (Wood Products)": Layers,
    "Mining and Quarrying": Pickaxe,
    "Others": HelpCircle,
    "Real Estate and Renting": Home,
    "Trading": Store,
    "Transport, storage and Communications": Truck
};

export default async function StateDirectoryPage({ params }) {
    // Await params in Next.js App Router
    const { state } = await params;

    if (!state || state.length > 100) {
        notFound();
    }

    const formattedStateName = state.replace(/-/g, " ").toUpperCase();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans bg-gray-50/50 min-h-screen">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 text-xs text-gray-500 flex items-center gap-2 tracking-wide">
                <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
                <span className="text-gray-300">/</span>
                <Link href="/directory" className="hover:text-blue-600 transition-colors font-medium">Directory</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-700 font-semibold text-xs flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 inline text-gray-400" />
                    {formattedStateName}
                </span>
            </nav>

            {/* Page Header Area */}
            <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-3 shadow-sm mb-10 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-4 uppercase tracking-wider">
                    Official Registry Data
                </div>
                <h1 className="text-xl font-extrabold text-gray-900 mb-3">
                    Companies Register: <span className="text-blue-600">{formattedStateName}</span>
                </h1>
                <p className="text-gray-600 text-base">
                    Explore active businesses, corporations, and startups mapped by sector. Select an industrial classification category below to filter registered corporations operating in {formattedStateName}.
                </p>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {INDUSTRIES.map((industry) => {
                    const industrySlug = cleanUrlSegment(industry);

                    // Assign the mapped icon, or fallback gracefully to Building2
                    const IndustryIcon = INDUSTRY_ICONS[industry] || Building2;

                    return (
                        <Link
                            key={industrySlug}
                            href={`/directory/${state}/${industrySlug}?page=1`}
                            className="group relative border border-gray-200/80 rounded-xl p-5 bg-white shadow-sm hover:shadow-md hover:border-blue-400 hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between min-h-[140px]"
                        >
                            <div className="space-y-3">
                                {/* Contextual indicator icon box */}
                                <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                                    <IndustryIcon className="w-6 h-6" />
                                </div>

                                {/* Industry Title */}
                                <h2 className="text-gray-900 font-semibold text-base leading-snug group-hover:text-blue-700 break-words pr-4 transition-colors">
                                    {industry}
                                </h2>
                            </div>

                            {/* Bottom visual anchor element */}
                            <div className="pt-4 flex items-center justify-between text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                                <span>Browse Companies</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}