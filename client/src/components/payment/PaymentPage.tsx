// import { Wifi, ReceiptIndianRupee, X, BookOpen } from "lucide";
import { useFetch } from "../../hooks/useFetch";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import { usePurchaseStore } from "../../store/purchasesStore";
// import { usePurchaseStore } from "../../store/purchaseStore";
export default function Payment() {
  const cartItems = useCartStore((state) => state.cart);
  const remove = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const username = useAuthStore((state) => state.username);
  const setPurchases = usePurchaseStore((state) => state.setPurchases);
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const tax = (subtotal * 10) / 100;
  const discount = (subtotal * 5) / 100;
  const total = subtotal + tax - discount;
  const body = {
    items: cartItems.map((e) => ({ productId: e._id })),
    totalAmount: total,
  };

  const { error, loading, request } = useFetch(
    "product/purchase",
    "POST",
    {
      requireAuth: true,
    },
    body
  );

  const finalPay = async () => {
    if (total > 0) {
      try {
        const res = await request();
        console.log(res);
        setPurchases!(cartItems, total);
        clearCart();
        alert(res.message);
      } catch (error) {
        error instanceof Error && alert(error.message);
        console.log(error);
      }
    } else {
      alert("Empty Cart");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div>
        <h1 className="text-4xl font-extrabold  tex-black  mt-8 mb-8 md:mt-6 lg:mt-5">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-700">
                {/* <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" /> */}
                <p className="text-gray-400 text-lg">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-background backdrop-blur-sm rounded-2xl p-4 border border-secondary hover:border-gray-700 transition-all"
                >
                  <div className="flex gap-4 items-start">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0].url}
                        alt={product.productName}
                        className="w-40 h-28 object-contain rounded-lg"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-1">
                            {product.productName}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2"></p>
                        </div>
                        <button
                          onClick={() => remove(product._id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        ></button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        {product.description}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side - Payment Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Credit Card */}
              <div className="mb-6">
                <div className="bg-coffee-dark rounded-3xl p-6 shadow-2xl border border-gray-600">
                  {/* Card Icons */}
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md opacity-80"></div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-300 text-base font-light">
                      {username}
                    </p>
                    <p className="text-gray-300 text-lg font-light tracking-wider">
                      •••• 7297
                    </p>
                  </div>

                  {/* Expiry and Logo */}
                  <div className="flex justify-between items-end">
                    <p className="text-gray-300 text-base">12/29</p>
                    <div className="flex items-center gap-1">
                      <div className="w-7 h-7 bg-red-500 rounded-full opacity-80"></div>
                      <div className="w-7 h-7 bg-orange-400 rounded-full opacity-80 -ml-3"></div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-1 text-right">
                    Master Card
                  </p>
                </div>
              </div>

              {/* Payment Details Card */}
              <div className="bg-coffee-dark backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-700">
                {/* Line Items */}
                <div className="space-y-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-base">Subtotal:</span>
                    <span className="text-gray-200 text-base font-medium">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-base">Tax (10%):</span>
                    <span className="text-gray-200 text-base font-medium">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-base">Discount:</span>
                    <span className="text-green-400 text-base font-medium">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-600 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Total Due Amount
                    </p>
                    <p className="text-white text-4xl font-bold">
                      {total.toFixed(2)}
                      <span className="text-gray-400 text-xl font-normal ml-2">
                        INR
                      </span>
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-2xl p-3"></div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={finalPay}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
