import React from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
	const location = useLocation();
	
	React.useEffect(() => {
		const lastHash = location.hash.slice(1); // safe hash for further use after navigation
		
		if (lastHash && document.getElementById(lastHash)) {
			setTimeout(() => {
				document.getElementById(lastHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
		}
	}, [location]);
	
	return null;
}

export default ScrollToAnchor;
