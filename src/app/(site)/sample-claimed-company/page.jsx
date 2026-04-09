import EditedCompany from "@/components/EditedCompany";

// Sample data to show off the UI features
const sampleGovtData = {
    companyname: "Sample Company",
    cin: "U74140TN2026PTC123456",
    companystatus: "Active",
    companyindustrialclassification: "Trading",
    registered_office_address: "123 Minimalism Way, Alwarpet, Chennai, Tamil Nadu 600018",
    nic_code: "74203",
    companyregistrationdate_date: "12 March 2026",
    authorizedcapital: "10,00,000",
    paidupcapital: "5,00,000",
    listingstatus: "Unlisted",
    companystatecode: "Tamil Nadu",
    companycategory: "Company limited by Shares",
    companysubcategory: "Non-govt company",
    companyclass: "Private"
};

const sampleEditedValue = {
    header: {
        logo: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200",
        banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
        tagline: "Sample tagline text for the brand statement."
    },
    stats: {
        founded: "2026",
        employees: "0-0"
    },
    about: {
        content: "Sample descriptive text about the company's mission, values, and primary services goes here."
    },
    services: [
        { title: "Service Title One", description: "Sample description for the first service offering." },
        { title: "Service Title Two", description: "Sample description for the second service offering." },
        { title: "Service Title Three", description: "Sample description for the third service offering." }
    ],
    contact: {
        phone: "00 00000 00000",
        email: "contact@sample.domain",
        website: "www.sample.domain",
        workingHours: "Monday - Friday: 0:00 AM - 0:00 PM"
    }
};
export default function SamplePage() {
    return (
        <EditedCompany
            govtData={sampleGovtData}
            editedValue={sampleEditedValue}
        />
    );
}