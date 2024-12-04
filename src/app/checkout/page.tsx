import { UserNavbar } from "../user-navbar";
import { CheckoutForm } from "./checkout";

export default function CheckoutPage() {
  return (
    <div className="bg-gradient-to-r from-secondary-700 to-secondary-300">
      <UserNavbar className="sticky top-0 z-50" />
      <CheckoutForm />
    </div>
  );
}
