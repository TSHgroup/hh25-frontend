import React, { useState, useEffect } from 'react';

const Gif: React.FC = () => {
	const [isAvailable, setIsAvailable] = useState(true);

	useEffect(() => {
		const checkAvailability = async () => {
			try {
				const response = await fetch("/video/1", { method: 'HEAD' });
				if (response.status === 404) {
					setIsAvailable(false);
				}
			} catch (error) {
				setIsAvailable(false);
			}
		};

		checkAvailability();
	}, []);

	if (!isAvailable) {
		return null;
	}

	return(
		<section className="py-20 sm:py-24 px-4 bg-gray-50">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Zobacz, jak to działa</h2>
				<div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl mx-auto overflow-hidden">
					<iframe 
						className="w-full aspect-video" 
						src="https://odpalgadke.q1000q.cc/video/1"
						title="Prezentacja aplikacji OdpalGadkę" 
						frameBorder="0">
					</iframe>
				</div>
			</div>
		</section>
	);
};

export default Gif;