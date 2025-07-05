import { useContext } from "react";
import { MyStoreContext } from "./MyStoreContext";

export const useMyStore = () => useContext(MyStoreContext);