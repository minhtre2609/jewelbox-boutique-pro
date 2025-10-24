import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Luxury Jewelry
            </h3>
            <p className="text-sm text-muted-foreground">
              Trang sức cao cấp, thiết kế tinh xảo cho những dịp đặc biệt của bạn.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">Nhẫn</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Dây chuyền</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Bông tai</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Lắc tay</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Chính sách</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Bảo hành</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contact@luxuryjewelry.vn</li>
              <li>Hotline: 1900 xxxx</li>
              <li>Địa chỉ: 123 Đường ABC, TP. HCM</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Luxury Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
