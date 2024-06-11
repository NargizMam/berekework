import React from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
	const location = useLocation();
	
	React.useEffect(() => {
		const lastHash = location.hash.slice(1);
		
		if (lastHash) {
			console.log('IN IF: ', lastHash);
			setTimeout(() => {
				document.getElementById(lastHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 500);
		}
	}, [location]);
	
	return null;
}

export default ScrollToAnchor;
