/**
 * The anchor a task step's reference chip scrolls to, and the shape of the
 * chip itself. Lives in lib/ so both the material renderer and each route's
 * content file can use it without a component→lib→component cycle.
 */
export const materialAnchorId = (sectionId: string) => `material-${sectionId}`;

export type MaterialRef = { id: string; label: string };
