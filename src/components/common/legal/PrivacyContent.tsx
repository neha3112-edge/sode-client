"use client";

export default function PrivacyContent({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <div className="space-y-5 text-left max-h-[70vh] overflow-y-auto pr-1">

            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Privacy Policy
                </h2>
                <div className="h-px bg-gray-300 mt-3" />
            </div>

            {/* INTRO */}
            <p className="text-sm text-gray-700 leading-relaxed">
                All information on this platform is provided by{" "}
                <strong>DistanceEducationSchool.com</strong>, under the legal name of{" "}
                <strong>SODE Counselling Services LLP</strong>. We are an educational
                counselling platform that helps students find trusted distance and online
                courses from <strong>UGC-DEB-approved universities</strong>. Our goal is
                to provide accurate information and personalised support to help you
                choose the right program.
            </p>

            {/* SECTIONS */}
            <div className="space-y-4">

                {/* 1 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        1. No Personal Data Collected by Default
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        You can freely browse our website without sharing any personal
                        information. We do not collect your name, phone number, or email
                        address unless you choose to fill out a form or contact us directly.
                    </p>
                </div>

                {/* 2 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        2. How We Use It
                    </h3>

                    <p className="text-sm text-gray-600 mb-2">
                        Your information is used to:
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        <li>Guide you in choosing the right university or course</li>
                        <li>Provide counselling support</li>
                        <li>Share admission-related updates</li>
                    </ul>

                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        We may send you important updates (like admission deadlines or
                        university alerts) via WhatsApp and email. You can opt out anytime.
                    </p>
                </div>

                {/* 3 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        3. Scope
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        This privacy policy applies to visitors who access this specific
                        platform operated under DistanceEducationSchool.com by SODE
                        Counselling Services LLP. It covers how we collect, use, and protect
                        data when you explore course information, compare universities, or
                        fill out enquiry forms on this platform.
                    </p>

                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        This policy applies only to the information collected through this
                        platform and does not cover any data collected on the main website or
                        other external sites.
                    </p>
                </div>

                {/* 4 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        4. Data Sharing
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We share your details only with trusted university partners, and only
                        for the purpose of counselling or admission. We do not sell or share
                        data with third-party advertisers.
                    </p>
                </div>

                {/* 5 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        5. External Links
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Our website may include links to official university portals. We are
                        not responsible for the content or privacy policies of those external
                        sites. We recommend visiting the official university website for new
                        updates.
                    </p>
                </div>

                {/* 6 */}
                <div>
                    <h3 className="font-semibold text-gray-800 text-base mb-1">
                        6. Cookies and Analytics
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Our website uses cookies to improve the user experience. These help
                        us understand how visitors use our site (e.g., most viewed pages,
                        time spent, etc.). These cookies do not identify you personally.
                    </p>
                </div>

            </div>

            {/* CLOSE BUTTON */}
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