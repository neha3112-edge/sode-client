"use client";

export default function DisclaimerContent({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <div className="space-y-4 text-left">
            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Disclaimer
                </h2>
                <div className="h-px bg-gray-300 mt-3" />
            </div>
            {/* TOP TEXT */}
            <p className="text-sm text-gray-700 leading-relaxed">
                <span className="px-1">
                    This information is provided by DistanceEducationSchool.com, under the legal entity of{" "}
                    <strong>SODE Counselling Services LLP</strong>, registered with the{" "}
                    <strong>Ministry of Corporate Affairs</strong>, with the main objective of providing
                    information, guidance, and counselling services about{" "}
                    <strong>UGC-DEB-approved universities</strong>.
                </span>{" "}
                <span className="px-1">
                    We do not act as a university or an admission authority.
                </span>
            </p>

            {/* SECTION TITLE */}
            <h3 className="text-lg font-semibold text-gray-800">
                Essential Points
            </h3>

            {/* BULLETS */}
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                <li className="px-1 inline-block">
                    All university names, logos, and trademarks used are for informational purposes only.
                </li>
                <li className="px-1 inline-block">
                    Our role is to provide updates, information, and guidance on universities.
                </li>
                <li className="px-1 inline-block">
                    We do not charge students any fees for counselling or guidance.
                </li>
                <li className="px-1 inline-block">
                    We do not issue degrees, mark sheets, or certificates.
                </li>
                <li className="px-1 inline-block">
                    Our aim is to offer free and unbiased counselling.
                </li>
                <li className="px-1 inline-block">
                    We respect the integrity and reputation of all universities.
                </li>
                <li className="px-1 inline-block">
                    Users are encouraged to verify information from official portals.
                </li>
                <li className="px-1 inline-block">
                    Our services are transparent, legal, and purely for student support.
                    {" "}
                    <span
                        onClick={onClose}
                        className="text-blue-600 cursor-pointer underline ml-1"
                    >
                        close
                    </span>
                </li>
            </ul>
        </div>
    );
}