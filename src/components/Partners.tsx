const partners = [
  { name: 'HFF', logo: 'https://svnmcdonald.com/wp-content/uploads/2025/07/HFF-Logo-All-White_withregistration-300x97.png' },
  { name: 'Ocala Metro', logo: 'https://svnmcdonald.com/wp-content/uploads/2023/06/ocala_metro.png' },
  { name: 'Stellar MLS', logo: 'https://svnmcdonald.com/wp-content/uploads/2023/05/stellar-mls.png' },
  { name: 'Realtor', logo: 'https://svnmcdonald.com/wp-content/uploads/2023/05/Realtor-logo.png' },
];

const Partners = () => {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-14 w-auto object-contain"
                loading="lazy"
                decoding="async"
                width={200}
                height={56}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
