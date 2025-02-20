import CompanyProfile from "@/Components/FMP/CompanyProfile";
import SymbolInput from "@/Components/SymbolInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/react";

export default function CompanyInformation({ auth }) {
    const { errors, data } = usePage().props;

    const handleButtonClick = async (value) => {
        await Inertia.get("/company-information/profile", {
            symbol: value,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Information
                </h2>
            }
        >
            <Head title="Company Information" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SymbolInput
                                placeholderText="Symbol"
                                buttonText="Get Profile"
                                onButtonClick={handleButtonClick}
                                errors={errors}
                            />
                            {data && (
                                <CompanyProfile
                                    details={data.company_profile}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
