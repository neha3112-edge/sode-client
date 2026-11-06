// Amity Online Assets Helper
export const AMITY_ASSET_BASE = "/assets/all_universities_images/amity";

/**
 * Returns the full path for any Amity asset.
 * Example: amityImg("Amity-online-logo.png") -> "/assets/all_universities_images/amity/Amity-online-logo.png"
 */
export const amityImg = (fileName) => {
  if (!fileName) return "";
  if (fileName.startsWith("/") || fileName.startsWith("http")) return fileName;
  return `${AMITY_ASSET_BASE}/${fileName.replace(/^\/+/, "")}`;
};

export default amityImg;

