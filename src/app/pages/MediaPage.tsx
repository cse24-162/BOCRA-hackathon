import { useState } from "react";
import heroImg from "../assets/heroBg.png";
import hackathon from "../assets/hackathon.jpg";
import hero2 from "../assets/hero2.png";

type MediaType = "event" | "announcement" | "update";

type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  snippet: string;
  image: string;
  date: string;
  body: string;
};

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "bocra-hackathon-2024",
    type: "event",
    title: "BOCRA Website Development Hackathon",
    snippet:
      "Bringing together innovators and stakeholders to shape Botswana's digital future through collaborative development.",
    image: hackathon,
    date: "March 2024",
    body:
      "The BOCRA Website Development Hackathon brought together developers, designers, and innovators from across Botswana. Participants collaborated over two days to build solutions that advance digital communication and regulatory transparency in the country.",
  },
  {
    id: "reduced-data-prices-2024",
    type: "announcement",
    title: "Reduced Data Prices Approved",
    snippet:
      "BOCRA approves reduced data tariffs for major telecom operators including Orange and BTC Botswana.",
    image: hero2,
    date: "February 2024",
    body:
      "BOCRA has officially approved reduced data tariffs for major telecommunications operators, including Orange Botswana and BTC. The new pricing structure is designed to make internet access more affordable for all Botswana residents, supporting the national digital inclusion agenda.",
  },
  {
    id: "sadc-roaming-2024",
    type: "update",
    title: "SADC Roaming Tariff Harmonisation",
    snippet:
      "Botswana collaborates with five SADC member states to reduce and harmonise mobile roaming charges across the region.",
    image: heroImg,
    date: "January 2024",
    body:
      "Botswana is working alongside five other SADC member states to harmonise mobile roaming charges across the region. This initiative aims to reduce the cost of cross-border communication for travellers and businesses, strengthening economic integration across Southern Africa.",
  },
];

const FILTERS: (MediaType | "all")[] = ["all", "event", "announcement", "update"];

export function MediaPage() {
  const [activeFilter, setActiveFilter] =
    useState<MediaType | "all">("all");

  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filtered =
    activeFilter === "all"
      ? MEDIA_ITEMS
      : MEDIA_ITEMS.filter((item) => item.type === activeFilter);

  return (
    <div className="w-full min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[55vh] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003A5C]/80 via-[#0077B3]/60 to-[#0095DA]/40" />

        <div className="relative text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Media & Events
          </h1>
          <p className="text-blue-100 text-lg">
            Stay updated with the latest news, announcements, and events from BOCRA
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-3 justify-center flex-wrap">
        {FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === type
                ? "bg-[#0095DA] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CARDS GRID */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm mt-1">
              Try selecting a different filter above.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border hover:shadow-xl transition duration-300"
              >
                {/* IMAGE */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#0095DA] font-semibold">
                      {item.type}
                    </span>

                    <span className="text-xs text-gray-400">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mt-1 mb-2 text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.snippet}
                  </p>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-4 text-sm font-medium text-[#0095DA] hover:text-[#0077B3] transition"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE */}
            <div className="h-56 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#0095DA] font-semibold">
                  {selectedItem.type}
                </span>
                <span className="text-xs text-gray-400">
                  {selectedItem.date}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-3">
                {selectedItem.title}
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm">
                {selectedItem.body}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 rounded-full bg-[#0095DA] text-white text-sm font-medium hover:bg-[#0077B3] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}