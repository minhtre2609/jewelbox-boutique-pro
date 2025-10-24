import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchCart();
  }, []);

  const checkAuthAndFetchCart = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    fetchCart();
  };

  const fetchCart = async () => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error: any) {
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Đang tải...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-serif font-bold mb-8">Giỏ hàng</h1>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-4">
                  Giỏ hàng trống
                </p>
                <Button onClick={() => navigate("/products")}>
                  Tiếp tục mua sắm
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          {item.products.image_url ? (
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold mb-1">
                              {item.products.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Số lượng: {item.quantity}
                            </p>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(item.products.price * item.quantity)}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Tổng cộng</h2>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span className="text-primary">Miễn phí</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Tổng tiền</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                      
                      <Button className="w-full" size="lg">
                        Thanh toán
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
