import { QrCode, History, Shield, RefreshCw, Smartphone, Users } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Integration",
    description: "Each artwork gets a unique QR code linking to its complete digital provenance record. Instant access to history and authenticity verification.",
    bgColor: "bg-accent-500",
  },
  {
    icon: History,
    title: "Provenance Tracking",
    description: "Complete ownership history from artist to current owner. Every transaction, exhibition, and movement is permanently recorded.",
    bgColor: "bg-emerald-500",
  },
  {
    icon: Shield,
    title: "Secure Verification",
    description: "Blockchain-backed authentication ensures records cannot be tampered with. Trust in every transaction and ownership claim.",
    bgColor: "bg-amber-500",
  },
  {
    icon: RefreshCw,
    title: "Ownership Transfer",
    description: "Seamless ownership transfers with verification codes. Both parties confirm transactions for complete security and transparency.",
    bgColor: "bg-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Scan, verify, and manage artworks from anywhere. Our mobile-first design ensures great experience on all devices.",
    bgColor: "bg-red-500",
  },
  {
    icon: Users,
    title: "Admin Dashboard",
    description: "Comprehensive management tools for galleries, collectors, and institutions. Bulk operations and detailed analytics included.",
    bgColor: "bg-indigo-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Comprehensive Art Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From creation to collection, every artwork deserves a complete history. Our platform ensures authenticity and tracks ownership with precision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
