import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/FormatCurrency";

interface CartItemProps {
  id: number;
  quantity: number;
}

function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <Stack
      gap={3}
      direction="horizontal"
      className="d-flex justify-content-center  align-item-center "
    >
      <img
        src={item.imgUrl}
        alt=""
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".75rem" }}>
              {quantity}x
            </span>
          )}
        </div>

        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>


      </div>

        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price * quantity)}
        </div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
            &times;
        </Button>
    </Stack>
  );
}

export default CartItem;
