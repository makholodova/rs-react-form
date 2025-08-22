import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export function useClearLastAdded(
  lastAddedId: string | null,
  clearAction: () => { type: string },
  delay = 5000
) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!lastAddedId) return;
    const t = setTimeout(() => dispatch(clearAction()), delay);
    return () => clearTimeout(t);
  }, [lastAddedId, dispatch, clearAction, delay]);
}
