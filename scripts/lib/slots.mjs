/** Active vs parked investigation caps. Parked do not occupy active slots. */

export const DEFAULT_MAX_OPEN = 3;
export const DEFAULT_MAX_PARKED = 10;

export function slotLimits(state = {}) {
  return {
    maxOpen: state.max_open_investigations ?? DEFAULT_MAX_OPEN,
    maxParked: state.max_parked_investigations ?? DEFAULT_MAX_PARKED,
  };
}

export function slotCounts(state = {}) {
  const open = state.open_investigations || [];
  const parked = state.parked_investigations || [];
  return {
    open: open.length,
    parked: parked.length,
    openIds: open,
    parkedIds: parked,
  };
}

/** Parked files do not block a new active investigation. */
export function canStartInvestigation(state = {}) {
  const { maxOpen } = slotLimits(state);
  return (state.open_investigations || []).length < maxOpen;
}

/** Parking another thread is allowed without a kill only below the parked cap. */
export function canParkWithoutKill(state = {}) {
  const { maxParked } = slotLimits(state);
  return (state.parked_investigations || []).length < maxParked;
}

export function slotViolations(state = {}) {
  const { maxOpen, maxParked } = slotLimits(state);
  const open = state.open_investigations || [];
  const parked = state.parked_investigations || [];
  const overlap = open.filter((id) => parked.includes(id));
  const violations = [];
  if (open.length > maxOpen) {
    violations.push(
      `open_investigations has ${open.length}; max is ${maxOpen} active. Park or kill one before starting another.`,
    );
  }
  if (parked.length > maxParked) {
    violations.push(
      `parked_investigations has ${parked.length}; max is ${maxParked}. Kill the weakest parked to make room.`,
    );
  }
  if (overlap.length) {
    violations.push(`ids listed as both open and parked: ${overlap.join(", ")}`);
  }
  return violations;
}
