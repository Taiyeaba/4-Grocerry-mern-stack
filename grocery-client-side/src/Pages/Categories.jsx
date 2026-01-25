import { categories } from "../assets/assets";
import { useNavigate } from "react-router";

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 container mx-auto">
      <p className="text-2xl md:text-3xl font-medium mb-6">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg
                       flex flex-col items-center justify-center gap-2
                       transition hover:shadow-md"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products-category/${category.path}`);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="max-w-28 transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-sm font-medium text-center text-gray-800">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
