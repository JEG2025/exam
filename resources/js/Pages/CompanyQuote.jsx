import CompanyProfile from "@/Components/FMP/CompanyProfile";
import SymbolInput from "@/Components/SymbolInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import FullQuote from "@/Components/FMP/FullQuote";

export default function CompanyQuote({ auth }) {
    const { errors, data } = usePage().props;

    const handleButtonClick = async (value) => {
        await Inertia.get("/company-quote/full", {
            symbol: value,
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Quote
                </h2>
            }
        >
            <Head title="Company Quote" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SymbolInput
                                placeholderText="Symbol"
                                buttonText="Get Full Quote"
                                onButtonClick={handleButtonClick}
                                errors={errors}
                            />
                            {data && <FullQuote details={data.full_quote} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
