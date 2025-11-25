import React from 'react';

const Gif: React.FC = () => {
	return(
		<section className="py-20 sm:py-24 px-4 bg-gray-50">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Zobacz, jak to działa</h2>
				<div className="bg-black rounded-2xl shadow-2xl border border-gray-200 max-w-4xl mx-auto overflow-hidden">
					<iframe 
						className="w-full aspect-video" 
						src="https://odpalgadke.q1000q.cc/video/1" 
						title="Prezentacja wideo aplikacji OdpalGadke" 
						frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
						allowFullScreen>
					</iframe>
				</div>
			</div>
		</section>
	);
};

export default Gif;