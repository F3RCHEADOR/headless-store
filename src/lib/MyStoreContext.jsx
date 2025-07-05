import { MyStoreContext } from "./MyStoreContext.js";

export const MyStoreProvider = ({ children }) => {
  const renderProductPrice = ({ price, regular_price, sale_price }) => {
    if (sale_price) {
      return (
        <>
          <div className="inline-flex space-x-1 mt-1 text-sm">
            <span className="line-through">${regular_price || price}</span>
            <span className="text-red-500">${sale_price}</span>
          </div>
        </>
      );
    }

    return <span className=" mt-1 text-sm">${regular_price || price}</span>;
  };

  return (
    <MyStoreContext.Provider value={{ renderProductPrice }}>
      {children}
    </MyStoreContext.Provider>
  );
};

