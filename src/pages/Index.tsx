import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Gift } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-jewelry.jpg";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(3);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error: any) {
      toast.error("Không thể tải sản phẩm nổi bật");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Luxury Jewelry Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>
          
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
              Vẻ đẹp vượt thời gian
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
              Trang sức cao cấp được chế tác tinh xảo từ vàng và kim cương
            </p>
            <Button
              size="lg"
              className="text-lg"
              onClick={() => navigate("/products")}
            >
              Khám phá bộ sưu tập
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thiết kế độc quyền</h3>
                <p className="text-muted-foreground">
                  Các mẫu thiết kế độc đáo, không trùng lặp
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chất lượng đảm bảo</h3>
                <p className="text-muted-foreground">
                  100% vàng, bạc và kim cương tự nhiên
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bảo hành trọn đời</h3>
                <p className="text-muted-foreground">
                  Cam kết chất lượng và dịch vụ sau bán hàng
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold mb-4">
                Sản phẩm nổi bật
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khám phá những thiết kế được yêu thích nhất trong bộ sưu tập của chúng tôi
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/products")}
              >
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Bắt đầu hành trình tìm kiếm món trang sức hoàn hảo
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và giúp bạn
              chọn món trang sức phù hợp nhất
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/products")}
            >
              Khám phá ngay
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
