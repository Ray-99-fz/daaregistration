/**
 * Department-level carousel images (bundled assets under `src/assets/`).
 * Folder names match the three departments on the site.
 */
import vfx66026 from "@/assets/3d and VFX/66026.jpg";
import vfx66027 from "@/assets/3d and VFX/66027.jpg";
import vfx66030 from "@/assets/3d and VFX/66030.jpg";
import vfx66034 from "@/assets/3d and VFX/66034.jpg";
import vfxNigel6 from "@/assets/3d and VFX/nigel 6.jpeg";

import gdKevinClass from "@/assets/GAME DEVELOPMENT/kevin class.jpg";
import gdScreenshot55 from "@/assets/GAME DEVELOPMENT/Screenshot (55).png";
import gdScreenshot0331 from "@/assets/GAME DEVELOPMENT/Screenshot 2026-03-31 113514.png";
import gdScreenshot080835 from "@/assets/GAME DEVELOPMENT/Screenshot 2026-04-08 085835.png";
import gdScreenshot080940 from "@/assets/GAME DEVELOPMENT/Screenshot 2026-04-08 085940.png";
import gdScreenshot090001 from "@/assets/GAME DEVELOPMENT/Screenshot 2026-04-08 090001.png";

import visOvil2 from "@/assets/VISUAL DEVELOPMENT/ovil 2.png";
import visOvil3 from "@/assets/VISUAL DEVELOPMENT/ovil 3.png";
import visTumpaleDpp2 from "@/assets/VISUAL DEVELOPMENT/tumpale dpp 2.jpg";
import visTumpaleDpp3 from "@/assets/VISUAL DEVELOPMENT/tumpale dpp3.jpg";
import visTumpaleIds1 from "@/assets/VISUAL DEVELOPMENT/tumpale ids 1.jpg";
import visTumpaleIds3 from "@/assets/VISUAL DEVELOPMENT/tumpale ids 3.jpg";

const galleryByDepartmentId: Record<string, readonly string[]> = {
  "3d-vfx": [vfx66026, vfx66027, vfx66030, vfx66034, vfxNigel6],
  "game-development": [
    gdKevinClass,
    gdScreenshot55,
    gdScreenshot0331,
    gdScreenshot080835,
    gdScreenshot080940,
    gdScreenshot090001,
  ],
  "visual-development": [
    visOvil2,
    visOvil3,
    visTumpaleDpp2,
    visTumpaleDpp3,
    visTumpaleIds1,
    visTumpaleIds3,
  ],
};

/** Resolved asset URLs for the department courses carousel. */
export function getDepartmentGallerySlides(departmentId: string): readonly string[] {
  return galleryByDepartmentId[departmentId] ?? [];
}
