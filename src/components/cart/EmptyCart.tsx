
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="bg-white/5 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-pulse">
        <ShoppingCart size={40} className="text-muted-foreground" />
      </div>
      <div className="text-3xl text-muted-foreground mb-4 font-minecraft">Sepetiniz boş</div>
      <p className="mb-8 text-white/70">Sepetinizde henüz ürün bulunmamaktadır. Mağazamızı keşfetmeye ne dersiniz?</p>
      <Link to="/shop">
        <Button className="minecraft-btn">
          <span className="btn-content">Alışverişe Başla</span>
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
