import { Offcanvas, OffcanvasHeader, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/FormatCurrency";
import storeItems from "../data/items.json";

interface isOpen {
  isOpen: boolean;
}

function ShoppingCart({ isOpen }: isOpen) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <OffcanvasHeader closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </OffcanvasHeader>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((items) => (
            <CartItem key={items.id} {...items} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
