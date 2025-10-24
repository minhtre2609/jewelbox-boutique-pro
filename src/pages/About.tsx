import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import collectionBanner from "@/assets/collection-banner.jpg";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={collectionBanner}
            alt="Luxury Jewelry Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
            <h1 className="text-5xl font-serif font-bold text-white">
              Về chúng tôi
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Câu chuyện của chúng tôi
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Luxury Jewelry được thành lập với niềm đam mê tạo ra những món
                trang sức tinh xảo, độc đáo mang đến vẻ đẹp vượt thời gian.
                Chúng tôi tin rằng mỗi món trang sức không chỉ là phụ kiện,
                mà còn là câu chuyện, là kỷ niệm và là cảm xúc được lưu giữ
                mãi mãi.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Chất lượng và nghệ thuật
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Mỗi sản phẩm của chúng tôi được chế tác tỉ mỉ bởi những nghệ
                nhân lành nghề với nhiều năm kinh nghiệm. Chúng tôi chỉ sử
                dụng vàng, bạc và kim cương chất lượng cao nhất, đảm bảo mỗi
                món trang sức đều đạt tiêu chuẩn hoàn hảo về cả chất lượng
                lẫn thẩm mỹ.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4">
                Cam kết của chúng tôi
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Chất lượng</h3>
                  <p className="text-sm text-muted-foreground">
                    100% vàng, bạc và kim cương tự nhiên, có chứng nhận quốc tế
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Bảo hành</h3>
                  <p className="text-sm text-muted-foreground">
                    Bảo hành trọn đời cho mọi sản phẩm, miễn phí làm sạch
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Tư vấn</h3>
                  <p className="text-sm text-muted-foreground">
                    Đội ngũ chuyên gia nhiệt tình tư vấn và hỗ trợ 24/7
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Giao hàng</h3>
                  <p className="text-sm text-muted-foreground">
                    Giao hàng toàn quốc, đóng gói sang trọng, bảo mật tuyệt đối
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-muted p-8 rounded-lg">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Liên hệ với chúng tôi
              </h2>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong> contact@luxuryjewelry.vn
                </p>
                <p>
                  <strong>Hotline:</strong> 1900 xxxx
                </p>
                <p>
                  <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí
                  Minh
                </p>
                <p>
                  <strong>Giờ làm việc:</strong> 9:00 - 21:00 hàng ngày
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
