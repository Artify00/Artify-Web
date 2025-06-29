import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marina Chen",
    role: "Gallery Director",
    content: "Artify has revolutionized how we track our collection. The QR code system is intuitive and our collectors love the transparency.",
    initials: "M",
    bgColor: "bg-accent-500",
  },
  {
    name: "James Rodriguez",
    role: "Private Collector",
    content: "The provenance tracking gives me complete confidence in my acquisitions. Every piece has a complete, verifiable history.",
    initials: "J",
    bgColor: "bg-emerald-500",
  },
  {
    name: "Sarah Kim",
    role: "Contemporary Artist",
    content: "As an artist, I love knowing where my works end up. Artify helps me stay connected with my pieces and their journey.",
    initials: "S",
    bgColor: "bg-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Trusted by Art Communities
          </h2>
          <p className="text-xl text-gray-600">
            Galleries, collectors, and artists rely on Artify for authentic provenance tracking
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {testimonial.initials}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
