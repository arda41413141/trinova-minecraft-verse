
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  return (
    <div className="text-center py-8">
      <div className="text-3xl text-muted-foreground mb-4">Sepetiniz boş</div>
      <p className="mb-8">Sepetinizde henüz ürün bulunmamaktadır.</p>
      <Link to="/shop">
        <Button className="minecraft-btn">
          <span className="btn-content">Alışverişe Başla</span>
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
