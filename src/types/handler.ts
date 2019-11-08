import { Effect } from ".";

export const noPropagate = (effect: Effect.Effect0) => (
  event: React.MouseEvent
) => {
  event.stopPropagation();
  effect();
};
