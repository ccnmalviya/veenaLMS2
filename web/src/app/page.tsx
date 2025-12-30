import { HeroBanner } from "@/components/home/HeroBanner";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { PromoRow } from "@/components/home/PromoRow";
import { LiveStrip } from "@/components/home/LiveStrip";
import { NewProducts } from "@/components/home/NewProducts";
import { ProductCategories } from "@/components/home/ProductCategories";
import { BestSellingProducts } from "@/components/home/BestSellingProducts";
import { RecommendedProducts } from "@/components/home/RecommendedProducts";
import { OffersPromotions } from "@/components/home/OffersPromotions";
import { NewsletterSubscription } from "@/components/home/NewsletterSubscription";
import { Header } from "@/components/layout/Header";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { Testimonials } from "@/components/common/Testimonials";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <main>
        {/* Top thin notification bar */}
        <NotificationStrip />

        {/* Category Navigation Links */}
        <CategoryNavigation />

        {/* Hero section matching design */}
        <HeroBanner />

        {/* Two promotional cards row */}
        <PromoRow />

        {/* Live classes strip */}
        <LiveStrip />

        {/* Categories horizontal strip */}
        <ProductCategories />

        {/* New Arrivals */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
            <NewProducts />
          </div>
        </section>

        {/* Best Sellers */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
            <BestSellingProducts />
          </div>
        </section>

        {/* Big offer banner similar to design */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <OffersPromotions />
          </div>
        </section>

        {/* Recommended section near bottom */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
            <RecommendedProducts />
          </div>
        </section>

        {/* Shared testimonials */}
        <Testimonials />

        {/* Newsletter / WhatsApp Subscription */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <NewsletterSubscription />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
