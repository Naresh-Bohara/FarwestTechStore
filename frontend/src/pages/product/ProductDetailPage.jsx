import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageNotFound from "../errors/PageNotFound";
import productSvc from "./product.service";
import ProductDetailImageSlider from "../../components/product/ProductDetailImageSlider";
import ProductGridList from "../../components/product/ProductGridList";
import { AuthContext } from "../../components/context/AuthContext";
import ReviewForm from "../../components/product/ReviewForm";
import cartSvc from "../cart/cart.service";
import { getMyCartItems } from "../../stores/cart.store";
import { useDispatch } from "react-redux";

const ProductDetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState();
  const [related, setRelated] = useState();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    auth: { loggedInUser },
  } = useContext(AuthContext);

  const loadProductDetail = async () => {
    try {
      const response = await productSvc.getProductBySlug(params.slug);
      setDetail(response.data.detail);
      setRelated(response.data.related);
      setReviews(response.data.reviews);
      setAvgRating(response.data.avgRating || 0);
      setTotalReviews(response.data.totalReviews || 0);
      setLoading(false);
    } catch (exception) {
      toast.error("Failed to load product detail");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductDetail();
  }, [params]);

 // Allow only numbers while typing
const handleQuantityChange = (e) => {
  let val = e.target.value;

  // allow empty string while typing
  if (val === "") {
    setQuantity("");
    return;
  }

  // only numbers
  const num = Number(val);
  if (!isNaN(num)) {
    setQuantity(num);
  }
};

// Enforce min 0 only on blur
const handleQuantityBlur = () => {
  let val = Number(quantity);

  if (isNaN(val) || val < 0) {
    setQuantity(0);
    return;
  }

  setQuantity(val);
};

const addToCart = async (e) => {
  e.preventDefault();

  if (!loggedInUser) {
    toast.error("You need to be logged in to add products to cart");
    navigate("/login?redirectTo=/products/" + detail.slug);
    return;
  }

  let val = Number(quantity);
  if (isNaN(val) || val < 0) {
    toast.error("Quantity cannot be negative");
    return;
  }

  try {
    await cartSvc.addToCart({
      productId: detail._id,
      quantity: val,
    });

    toast.success("Product added to cart successfully");
    setQuantity(1);
      dispatch(getMyCartItems());
  } catch (err) {
    toast.error("Failed to add product to cart");
    console.log(err);
  }
};

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {detail ? (
            <>
              {/* ===== Product Section ===== */}
              <section className="py-10 bg-white dark:bg-gray-900 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
                    {/* Product Images */}
                    {detail.images && detail.images.length > 0 ? (
                      <ProductDetailImageSlider images={detail.images} />
                    ) : (
                      <img
                        src="https://placehold.co/600x400/80d1d2/ffffff?text=No+Image"
                        alt="No product"
                        className="rounded-xl shadow"
                      />
                    )}

                    {/* Product Info */}
                    <div className="mt-6 sm:mt-8 lg:mt-0">
                      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                        {detail.title}
                      </h1>

                      {/* Price */}
                      <div className="mt-4 flex items-center gap-4">
                        <p className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                          NPR{" "}
                          {new Intl.NumberFormat("en", {
                            minimumFractionDigits: 2,
                          }).format(detail.actualAmount / 100)}
                        </p>
                        <p className="text-lg text-red-500 line-through dark:text-red-400">
                          NPR{" "}
                          {new Intl.NumberFormat("en", {
                            minimumFractionDigits: 2,
                          }).format(detail.price / 100)}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) =>
                            i < avgRating ? (
                              <FaStar
                                key={i}
                                className="text-yellow-400 w-5 h-5"
                              />
                            ) : (
                              <FaStar
                                key={i}
                                className="text-gray-300 w-5 h-5"
                              />
                            )
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ({avgRating}) • {totalReviews} Reviews
                        </p>
                      </div>

                      {/* Quantity + Cart */}
                      <div className="mt-6 flex gap-3 items-center">
                        {/* <a
              href="#"
              title=""
              className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button"
            >
               <FaHeart className="w-5 h-5 -ms-2 me-2 text-gray-300 hover:text-red-600"/>
              Add to favorites
            </a> */}
                        <input
  className="w-20 py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
  type="number"
  min={0}
  value={quantity}
  onChange={handleQuantityChange}
  onBlur={handleQuantityBlur}
/>

  <NavLink
    to={""}
    onClick={addToCart}
    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 shadow"
  >
    <FaShoppingCart className="w-5 h-5" />
    Add to Cart
  </NavLink>
                      </div>

                      {/* Description */}
                      <hr className="my-6 border-gray-200 dark:border-gray-700" />
                      <div
                        dangerouslySetInnerHTML={{ __html: detail.description }}
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      ></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ===== Reviews Section ===== */}
              <section className="py-10 bg-[#f9fafb] dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    {/* Reviews */}
                    <div className="w-full lg:w-3/4">
                      <h2 className="text-2xl font-bold text-primary-600 dark:text-white mb-6 border-b pb-2">
                        Customer Reviews
                      </h2>

                      <div className="space-y-6">
                        {reviews && reviews.length > 0 ? (
                          reviews.map((review) => (
                            <div
                              key={review._id}
                              className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow"
                            >
                              <div className="flex items-start gap-4">
                                <img
                                  src={
                                    review.reviewBy.image ||
                                    "https://placehold.co/60x60?text=User"
                                  }
                                  alt={review.reviewBy.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {review.reviewBy.name}
                                      </h4>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {review.reviewBy.email}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {Array.from({ length: 5 }, (_, i) =>
                                        i < review.rating ? (
                                          <FaStar
                                            key={i}
                                            className="w-4 h-4 text-yellow-400"
                                          />
                                        ) : (
                                          <FaStar
                                            key={i}
                                            className="w-4 h-4 text-gray-300"
                                          />
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <p className="mt-2 text-gray-700 dark:text-gray-200">
                                    {review.review}
                                  </p>
                                  {review.createdAt && (
                                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No reviews yet. Be the first to review this product!
                          </p>
                        )}
                      </div>

                      {/* Review Form */}
                      {loggedInUser ? (
                        <div className="mt-6">
                          <ReviewForm productId={detail._id} />
                        </div>
                      ) : (
                        <p className="flex py-4 bg-teal-100 my-4 rounded-lg justify-center text-gray-700">
                          To review this product, you need to
                          <NavLink
                            to={"/login"}
                            className="mx-1 font-semibold text-teal-600 hover:underline"
                          >
                            login
                          </NavLink>
                          first.
                        </p>
                      )}
                    </div>

                    {/* Related Products */}
                    <div className="w-full lg:w-1/4 mt-10 lg:mt-0">
                      <h2 className="text-xl font-bold text-yellow-400 dark:text-white border-b pb-2 mb-4">
                        Related Products
                      </h2>
                      <div className="space-y-4">
                        {related &&
                          related.map((prod, index) => (
                            <ProductGridList product={prod} key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetailPage;
