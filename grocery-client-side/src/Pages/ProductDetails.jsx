import { useNavigate, useParams, Link } from "react-router";
import { useCart } from "../Context/CartContext";
import UseAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import UseAxios from "../Hooks/UseAxios";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { user } = UseAuth();

  const axiosPublic = UseAxios();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [thumbnail, setThumbnail] = useState("");
  const [editing, setEditing] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [newOfferPrice, setNewOfferPrice] = useState("");

  // Reviews
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* =========================
     🔹 Fetch product by ID
  ========================= */
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axiosPublic
      .get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        if (res.data?.image) {
          setThumbnail(
            Array.isArray(res.data.image)
              ? res.data.image[0]
              : res.data.image
          );
        }
      })
      .catch(err => console.error("Product fetch error:", err))
      .finally(() => setLoading(false));
  }, [id, axiosPublic]);

  /* =========================
     🔹 Fetch DB user
  ========================= */
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/${user.email}`)
      .then(res => setDbUser(res.data))
      .catch(err => console.error("User fetch error:", err));
  }, [user, axiosSecure]);

  /* =========================
     🔹 Fetch reviews for this product
  ========================= */
  useEffect(() => {
    if (!id) return;

    axiosPublic
      .get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Reviews fetch error:", err));
  }, [id, axiosPublic]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  /* =========================
     🔐 Edit permission
  ========================= */
  const canEdit =
    dbUser &&
    (dbUser.role === "admin" ||
      dbUser.email?.toLowerCase() === product.sellerEmail?.toLowerCase());

  /* =========================
     🔧 Update price
  ========================= */
  const handlePriceUpdate = async () => {
    try {
      await axiosSecure.patch(`/products/price/${product._id}`, {
        price: newPrice,
        offerPrice: newOfferPrice,
      });

      toast.success("Price updated successfully");
      setEditing(false);

      const res = await axiosPublic.get(`/products/${id}`);
      setProduct(res.data);
      setThumbnail(
        Array.isArray(res.data.image)
          ? res.data.image[0]
          : res.data.image
      );
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  /* =========================
     🔹 Submit review
  ========================= */
  const handleReviewSubmit = async () => {
    try {
      await axiosSecure.post("/reviews", {
        productId: product._id,
        productName: product.name,
        rating,
        comment,
      });

      toast.success("Review added");
      setShowReviewModal(false);
      setComment("");

      // Refresh reviews
      const res = await axiosPublic.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to add review");
      console.error(err);
    }
  };

  // Get user initials for avatar
  const getInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="max-w-6xl w-full px-6 mx-auto mt-10">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        <Link to="/">Home</Link> /{" "}
        <Link to="/all-products">Products</Link> /{" "}
        <span className="text-indigo-500">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-6">

        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) &&
              product.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setThumbnail(img)}
                  className="w-24 border cursor-pointer"
                  alt=""
                />
              ))}
          </div>

          <div className="border p-6">
            <img
              src={thumbnail}
              className="h-96 object-contain"
              alt={product.name}
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <p className="text-xs text-gray-400">
            Sold by: {product.addedBy?.storeName || "Unknown"}
          </p>

          <div className="mt-4">
            <p className="line-through text-gray-400">
              Price: ${product.price}
            </p>
            <p className="text-2xl font-medium">
              Offer: ${product.offerPrice}
            </p>
          </div>

          <ul className="list-disc ml-4 mt-4 text-gray-600">
            {product.description?.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-3 mt-6">
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart");
              }}
              className="py-3 px-4 rounded-xl border-2 border-blue-600 bg-white text-blue-600 
    font-medium hover:bg-blue-50 hover:border-blue-700 active:scale-95 transition-all 
    duration-200 flex items-center justify-center gap-2 "
            >

              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
    text-white font-medium hover:from-blue-700 hover:to-indigo-700 
    active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg
    flex items-center justify-center gap-2 "
            >
              Buy Now
            </button>

            <button
              onClick={() => setShowReviewModal(true)}
              className="py-3  rounded-xl border-2 border-blue-700 text-blue-600
              font-medium"           
            >
              Add Review
            </button>

            {canEdit && (
              <button
                onClick={() => {
                  setNewPrice(product.price);
                  setNewOfferPrice(product.offerPrice);
                  setEditing(true);
                }}
                className="flex-1  py-3 px-3 rounded-lg bg-amber-500 
      text-white font-medium hover:bg-amber-600 transition-colors 
      flex items-center justify-center gap-2 shadow-sm"
              >
                Edit Price
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded">
            <h2 className="text-lg mb-4">Edit Price</h2>

            <input
              type="number"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
              className="w-full border p-2 mb-3"
              placeholder="Price"
            />

            <input
              type="number"
              value={newOfferPrice}
              onChange={e => setNewOfferPrice(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Offer Price"
            />

            <div className="flex gap-3">
              <button
                onClick={handlePriceUpdate}
                className="flex-1 bg-indigo-500 text-white py-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-300 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">Add Review</h2>

            <p className="text-sm text-gray-500 mb-2">
              Reviewer: {user?.email}
            </p>

            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              className="w-full border p-2 mb-3"
            >
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n} Star</option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-2 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handleReviewSubmit}
                className="flex-1 bg-indigo-500 text-white py-2"
              >
                Submit
              </button>

              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 bg-gray-300 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List - MODIFIED SECTION */}
      <div className="mt-16 border-t pt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-gray-900 mr-2">{averageRating}</span>
                <span className="text-gray-500">out of 5</span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition"
          >
            Write a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share your thoughts about this product!</p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map(r => (
              <div key={r._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
                      {getInitials(r.reviewerEmail)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {r.reviewerEmail?.split('@')[0] || "Anonymous"}
                        {r.reviewerRole === "admin" && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">Admin</span>
                        )}
                        {r.reviewerRole === "moderator" && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">Moderator</span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500">{r.reviewerEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= r.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                  </div>
                </div>
                <p className="text-gray-700">{r.comment}</p>
                
                {r.reply && (
                  <div className="mt-4 pl-4 border-l-2 border-indigo-200 bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span className="text-sm font-medium text-indigo-700">Store Response</span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.reply}</p>
                    {r.replyDate && (
                      <p className="text-xs text-gray-400 mt-2">Replied on {formatDate(r.replyDate)}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;