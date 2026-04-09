'use client'

import { useRouter } from "next/navigation"

export default function ClaimButton({ company, label = 'Claim Your Company' }) {

    const router = useRouter()

    const handleClaimNow = () => {
        sessionStorage.setItem("claim_company", JSON.stringify(company))
        router.push("/claim-your-company")
    }

    return (
        <button
            onClick={handleClaimNow}
            className="group cursor-pointer relative inline-flex items-center gap-2 px-7 py-2 text-base font-semibold text-white
  rounded-lg shadow-lg hover:shadow-xl
  bg-[linear-gradient(90deg,#10b981,#14b8a6,#10b981)]
  bg-[length:200%_200%] animate-gradientMove"
        >
            <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition"></span>
            {label}
        </button>

    )
}