import { Link } from 'react-router-dom';

const subServices = [
  "Conservation Easement",
  "Distressed/REO Properties",
  "Land Auctions",
  "Land Brokerage",
  "Strategic Marketing",
  "Value Positioning",
  "Valuation & BOV"
];

const subServiceRoutes: Record<string, string> = {
  "Conservation Easement": "/services/conservation-easement",
  "Distressed/REO Properties": "/services/distressed-reo",
  "Land Auctions": "/services/land-auctions",
  "Land Brokerage": "/services/land-brokerage",
  "Strategic Marketing": "/services/strategic-marketing",
  "Value Positioning": "/services/value-positioning",
  "Valuation & BOV": "/services/valuation-appraisal"
};

const Services = () => {
  return (
    <section className="py-14 md:py-24 bg-[#F6F6F6] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-white rounded-2xl md:rounded-[40px] p-6 md:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-md">
              <h4 className="text-2xl font-black text-svn-dark uppercase mb-4">Specialized Services</h4>
              <p className="text-gray-500 font-medium">Beyond standard brokerage, we provide expert advisory across several specialized practice areas.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {subServices.map((sub) => (
                <Link key={sub} to={subServiceRoutes[sub]} className="px-6 py-3 bg-gray-50 text-svn-dark text-xs font-bold uppercase tracking-widest rounded-full hover:bg-svn-orange hover:text-white transition-colors cursor-pointer">
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
