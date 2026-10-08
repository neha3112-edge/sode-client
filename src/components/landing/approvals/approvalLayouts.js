import ClassicApprovals from "./layouts/ClassicApprovals";
import AmityApprovals from "./layouts/AmityApprovals";
import LpuApprovals from "./layouts/LpuApprovals";
import GalgotiasApprovals from "./layouts/GalgotiasApprovals";
import UUApprovals from "./layouts/UUApprovals";
import SSBMApprovals from "./layouts/SSBMApprovals";
import LiverpoolApprovals from "./layouts/LiverpoolApprovals";
import RushfordApprovals from "./layouts/RushfordApprovals";
import ESGCIApprovals from "./layouts/ESGCIApprovals";
import GGUApprovals from "./layouts/GGUApprovals";
import ShooliniApprovals from "./layouts/ShooliniApprovals";
import VguApprovals from "./layouts/VguApprovals";
import SmuApprovals from "./layouts/SmuApprovals";
import ApprovalsSlider from "./layouts/ApprovalsSlider";

/**
 * Layout Registry Mapping
 * All university layouts are registered here.
 * Adding a new layout only requires registering it in this dictionary.
 */
export const APPROVAL_LAYOUTS = {
  // Standard Layout Names
  classic: ClassicApprovals,
  amity: AmityApprovals,
  table: GalgotiasApprovals,
  "lpu-dark": LpuApprovals,
  uu: UUApprovals,
  ssbm: SSBMApprovals,
  liverpool: LiverpoolApprovals,
  rushford: RushfordApprovals,
  esgci: ESGCIApprovals,
  ggu: GGUApprovals,
  split: ShooliniApprovals,
  vgu: VguApprovals,
  "vgu-badges": VguApprovals,
  "smu-carousel": SmuApprovals,
  slider: ApprovalsSlider,

  // Fallbacks by legacy slug (for zero-downtime backward compatibility)
  galgotias: GalgotiasApprovals,
  lpu: LpuApprovals,
  shoolini: ShooliniApprovals,
  smu: SmuApprovals,
  manipal: ApprovalsSlider,
};

export default APPROVAL_LAYOUTS;
