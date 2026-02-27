const partners: { name: string; logo: string; invert?: boolean }[] = [
  { name: 'HFF', logo: '/images/partners/hff-logo.png', invert: true },
  { name: 'Ocala Metro', logo: '/images/partners/ocala-metro.png' },
  { name: 'Stellar MLS', logo: '/images/partners/stellar-mls.png' },
  { name: 'Realtor', logo: '/images/partners/realtor-logo.png' },
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
                className={`h-10 md:h-14 w-auto object-contain${partner.invert ? ' invert' : ''}`}
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
