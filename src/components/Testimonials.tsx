import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'John Beatty',
    title: 'Landowner',
    content: 'I hired Bartow and the team at SVN McDonald to help our family sell several large land tracts. They put together a very detailed national marketing plan and were very effective...'
  },
  {
    name: 'Bernadette Castro',
    title: 'Private Investor',
    content: '"Bartow represented our family with the sale of our 132,000 square foot industrial property. He was always professional and responsive. Bartow is an asset to his profession."'
  },
  {
    name: 'John Mark Church',
    title: 'BB&T Asset Resolution Group',
    content: '"Bartow has represented us in numerous transactions. He has encyclopedic knowledge of the local market. His aggressive marketing techniques have produced multiple offers."'
  },
  {
    name: 'Victor Benatar',
    title: 'Principal, Finestone Equity',
    content: '"Bartow represented us on the sale of our 74,000sf office building. This was a difficult assignment with many challenges. We trusted Bartow and are very pleased with the results."'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-svn-grey text-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-6">
              See What Our Clients<br />Have to Say
            </h2>
            <div className="w-20 h-1 bg-svn-orange mb-8" />
            <p className="text-white/70 leading-relaxed">
              We pride ourselves on the relationships we've built and the results we've delivered for our clients across Central Florida.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-sm relative">
                <Quote className="text-svn-orange mb-6 opacity-50" size={32} />
                <p className="text-white/90 italic mb-8 leading-relaxed">
                  {t.content}
                </p>
                <div>
                  <p className="font-bold text-lg">{t.name}</p>
                  <p className="text-svn-orange text-sm font-bold uppercase tracking-wider">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
