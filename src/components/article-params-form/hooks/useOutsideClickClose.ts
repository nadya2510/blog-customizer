import { useEffect, useRef } from 'react';

export const useOutsideClickClose = (
	onClose: () => void
): React.RefObject<HTMLDivElement> => {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onClose]);

	return rootRef;
};
