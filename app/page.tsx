import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-brand-red selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-gold rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                K
              </div>
              <span className="font-serif font-black text-2xl tracking-tight text-gray-900">Kirosya<span className="text-brand-red">.</span></span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-600 hover:text-brand-red font-medium transition-colors">Özellikler</a>
              <a href="#customers" className="text-gray-600 hover:text-brand-red font-medium transition-colors">Müşteriler</a>
              <Link href="/panel" className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5">
                Panele Giriş
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-brand-red font-semibold text-sm mb-8 border border-red-100 shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            Restoranlar için Yeni Nesil Panel
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
            Restoranınızı <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-gold">Dijital Geleceğe</span> Taşıyın.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Menü yönetimi, QR sipariş, kurye takibi ve müşteri analizleri tek bir platformda. Kirosya ile operasyonlarınızı kolaylaştırın.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-red hover:bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-1 flex items-center justify-center gap-2">
              Hemen Başlayın <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-all hover:border-gray-300 flex items-center justify-center gap-2 shadow-sm">
              <i className="fa-regular fa-circle-play"></i> Demoyu İzle
            </button>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id="customers" className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Güvenen Müşterilerimiz</p>
          <div className="flex justify-center items-center opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
             <a href="https://sbaspava.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-3xl font-black text-gray-900 hover:text-brand-red transition-colors">
               <i className="fa-solid fa-fire-burner text-brand-red"></i>
               SB ASPAVA
             </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Her Şey Tek Ekranda</h2>
            <p className="text-lg text-gray-500">İhtiyacınız olan tüm araçlar modern ve kullanımı kolay bir arayüzde birleştirildi.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-red/20 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-qrcode"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Dinamik QR Menü</h3>
              <p className="text-gray-500 leading-relaxed">Ürünlerinizi, fiyatlarınızı ve fotoğraflarınızı anında güncelleyin. Müşterileriniz her zaman en güncel menüyü görsün.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-gold/20 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-amber-50 text-brand-gold rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Detaylı Raporlama</h3>
              <p className="text-gray-500 leading-relaxed">Hangi yemeğin daha çok sattığını, yoğun saatleri ve müşteri tercihlerini detaylı grafiklerle analiz edin.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-500/20 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-bell-concierge"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Sipariş Yönetimi</h3>
              <p className="text-gray-500 leading-relaxed">Yemeksepeti, Trendyol Go ve telefon siparişlerini tek bir panelden yöneterek operasyonel yükünüzü azaltın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red via-transparent to-transparent blur-2xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Restoranınız İçin Hazır Mısınız?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Hemen bizimle iletişime geçin ve Kirosya Panel'in avantajlarından yararlanmaya başlayın.</p>
          <button className="bg-brand-red hover:bg-red-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-[0_0_40px_rgba(185,28,28,0.5)] hover:shadow-[0_0_60px_rgba(185,28,28,0.6)] hover:-translate-y-1">
            Bize Ulaşın
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-brand-gold rounded-lg flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <span className="font-serif font-bold text-xl text-white">Kirosya</span>
          </div>
          <p className="text-sm">© 2026 Kirosya Technologies. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
