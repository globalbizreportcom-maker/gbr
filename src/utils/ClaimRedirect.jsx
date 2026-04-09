'use client'
import { useRouter } from "next/navigation"

export default function ClaimRedirect({ company, children, className = "" }) {
    const router = useRouter()

    const handleAction = (e) => {
        // Prevent parent click events if nested
        e.stopPropagation()

        if (company) {
            sessionStorage.setItem("claim_company", JSON.stringify(company))
            router.push("/claim-your-company")
        }
    }

    // This renders a div (or span) that makes anything inside it trigger the logic
    return (
        <div onClick={handleAction} className={`cursor-pointer ${className}`}>
            {children}
        </div>
    )
}