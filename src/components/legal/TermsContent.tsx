"use client";

export default function TermsContent({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <div className="space-y-5 text-left">

            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Terms and Conditions
                </h2>
                <div className="h-px bg-gray-300 mt-3" />
            </div>

            {/* INTRO */}
            <p className="text-sm text-gray-700 leading-relaxed">
                This page outlines the terms and conditions that apply when you access
                or use services provided on this platform, operated by{" "}
                <strong>SODE Counselling Services LLP</strong> under{" "}
                <strong>DistanceEducationSchool.com</strong>.
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
                We help students and working professionals explore distance and online
                education options offered by{" "}
                <strong>UGC-DEB-approved universities</strong>. These terms outline how
                we support the process, particularly when payments and third-party tools
                are involved.
            </p>

            {/* SECTIONS */}
            <div className="space-y-4">

                {/* 1 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        1. Our Role
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We provide information and counselling services only. We are not a
                        university and do not collect any university fees directly. All
                        academic or admission-related payments must be made to the respective
                        university.
                    </p>
                </div>

                {/* 2 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        2. Unauthorised Use or Fraud
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        If you suspect any unauthorised transaction linked to a service on
                        our platform, report it immediately. We will coordinate with the
                        respective payment partner for further action.
                    </p>
                </div>

                {/* 3 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        3. Updates to These Terms
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        These terms may be updated as services evolve. Continued use of this
                        platform implies your agreement to the latest version of these terms.
                    </p>
                </div>

                {/* 4 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        4. Contact Us
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        For support, email us at:{" "}
                        <span className="text-blue-600 font-medium">
                            support@distanceeducationschool.com
                        </span>
                    </p>
                </div>

            </div>

            {/* CLOSE TEXT */}
            <div className="text-right pt-2">
                <span
                    onClick={onClose}
                    className="text-blue-600 text-sm cursor-pointer underline"
                >
                    Close
                </span>
            </div>

        </div>
    );
}