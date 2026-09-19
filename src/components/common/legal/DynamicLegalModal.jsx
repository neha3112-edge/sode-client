import React from "react";

export default function DynamicLegalModal({ policy, onClose }) {
  if (!policy) {
    return (
      <div className="py-12 text-center text-gray-500 space-y-3">
        <p className="text-base font-semibold text-gray-700">Policy not found</p>
        <p className="text-xs text-gray-400">
          The requested policy document could not be loaded.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 text-sm text-blue-600 hover:underline font-medium"
        >
          Close
        </button>
      </div>
    );
  }

  const hasSections = Array.isArray(policy.sections) && policy.sections.length > 0;
  const hasPoints = Array.isArray(policy.points) && policy.points.length > 0;

  return (
    <div className="space-y-5 text-left">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {policy.title}
        </h2>
        <div className="h-px bg-gray-200 mt-3" />
      </div>

      {/* SUMMARY / INTRO */}
      {policy.summary && (
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {policy.summary}
        </p>
      )}

      {/* STRUCTURED NUMBERED SECTIONS */}
      {hasSections && (
        <div className="space-y-4">
          {policy.sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-semibold text-gray-800 text-base">
                {section.heading}
              </h3>
              {section.content && (
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              )}
              {Array.isArray(section.points) && section.points.length > 0 && (
                <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5 mt-1">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BULLET POINTS (e.g. Essential Points) */}
      {hasPoints && (
        <div className="space-y-2">
          {policy.subheading && (
            <h3 className="text-lg font-semibold text-gray-800">
              {policy.subheading}
            </h3>
          )}
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            {policy.points.map((pt, pIdx) => (
              <li key={pIdx} className="leading-relaxed">
                {pt}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RAW HTML (if no structured sections or points) */}
      {!hasSections && !hasPoints && policy.content && (
        <div
          className="prose prose-sm max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      )}

      {/* CONTACT & COMPLIANCE METADATA */}
      {(policy.contact_email || policy.contact_phone || policy.entity_name) && (
        <div className="pt-3 text-xs text-gray-500 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-4">
            {policy.contact_email && (
              <span>
                Email: <strong className="text-gray-700">{policy.contact_email}</strong>
              </span>
            )}
            {policy.contact_phone && (
              <span>
                Support: <strong className="text-gray-700">{policy.contact_phone}</strong>
              </span>
            )}
          </div>
          {policy.version && (
            <span className="text-gray-400">v{policy.version}</span>
          )}
        </div>
      )}

      {/* CLOSE BUTTON */}
      <div className="text-right pt-2">
        <button
          type="button"
          onClick={onClose}
          className="text-blue-600 text-sm hover:underline cursor-pointer font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
