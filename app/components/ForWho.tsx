import React from 'react';

const ForWho: React.FC = () => {
	return(
		<section className="py-20 sm:py-24 px-4 bg-white">
			<div className="container mx-auto text-center">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stworzone, by rozwiązywać realne problemy</h2>
				<p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
					Rozmowa bywa trudna. Niezależnie od tego, czy jesteś introwertykiem, masz lęk społeczny, czy jesteś w spektrum autyzmu – nasza aplikacja to bezpieczna przestrzeń do treningu i budowania pewności siebie.
				</p>
				<div className="flex flex-wrap justify-center gap-4 text-gray-700">
					<span className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full">Introwertycy</span>
					<span className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full">Osoby z lękiem społecznym</span>
					<span className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-full">Osoby w spektrum autyzmu</span>
					<span className="bg-yellow-100 text-yellow-700 font-semibold px-4 py-2 rounded-full">Przygotowujący się do wystąpień</span>
				</div>
			</div>
		</section>
    );
};

export default ForWho;