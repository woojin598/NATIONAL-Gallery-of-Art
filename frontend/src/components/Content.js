import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyHeader from "../MyHeader";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import QuoteBox from "./about/QuoteBox";
import Contact from "./contact/Contact";
import { LoginContext } from "../contexts/LoginContext";
import MemberList from "./admin/MemberList";
import MemberDelete from "./member/MemberDelete";
import MemberUpdate from "./member/MemberUpdate";
import MemberUpdatePasswd from "./member/MemberUpdatePasswd";
import MemberDetail from "./member/MemberDetail";
import MemberLogin from "./member/MemberLogin";
import MemberInsert from "./member/MemberInsert";
import MemberComp from "./member/MemberComp";
import PrivacyPolicy from "./member/agree/PrivacyPolicy";
import TermsofService from "./member/agree/TermsofService";
import MyPage from "./member/mypage/MyPage";
import ItemInsert from "./item/ItemInsert";
import ItemDetail from "./item/ItemDetail";
import ItemComp from "./item/ItemComp";
import ItemComp2 from "./item/ItemComp2";
import ItemList from "./item/ItemList";
import ItemUpdate from "./item/ItemUpdate";
import ItemDelete from "./item/ItemDelete";
import SearchComponent from "./item/SearchComp";
import ItemListPaging from "./item/ItemListPaging";
import Search from "./item/Search";
import ReplyList from "./reply/ReplyList";
import ReplyUpdate from "./reply/ReplyUpdate";
import OrderComp from "./order/OrderComp";
import OrderDetail from "./order/OrderDetail";
import OrderInsert from "./order/OrderInsert";
import OrderUpdate from "./order/OrderUpdate";
import OrderDelete from "./order/OrderDelete";
import Catalogcomp from "./catalog/Catalogcomp";
import Catalogupdate from "./catalog/Catalogupdate";
import CatalogInsert from "./catalog/CatalogInsert";
import styles from "./footer/Footer.module.css";



function Content() {
  const { loginInfo } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header>
          <MyHeader />
        </header>
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<QuoteBox />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/member-service/login" element={!loginInfo.BTOKEN ? <MemberLogin /> : <Navigate to="/" />} />
            <Route path="/member-service/delete/:username" element={<MemberDelete />} />
            <Route path="/member-service/update/:username" element={<MemberUpdate />} />
            <Route path="/member-service/update/MemberUpdatePasswd/:username" element={<MemberUpdatePasswd />} />
            <Route path="/member-service/detail/:username" element={<MemberDetail />} />
            <Route path="/member-service" element={<MemberComp />} />
            <Route path="/member-service/mypage/:username" element={<MyPage />} />
            <Route path="/member-service/list" element={<MemberList />} />
            <Route path="/member-service/insert" element={<MemberInsert />} />
            <Route path="/NATIONALGalleryofArt/privacy" element={<PrivacyPolicy />} />
            <Route path="/NATIONALGalleryofArt/Terms" element={<TermsofService />} />

            <Route path="/catalog-service/catalogs" element={<CatalogInsert />} />
            <Route path="/catalog-service/catalogs/productid" element={<Catalogupdate />} />
            <Route path="/catalog-service" element={<Catalogcomp />} />

            <Route path="/item-service/list" element={<ItemList />} />
            <Route path="/item-service/search" element={<SearchComponent />} />
            <Route path="/item-service/search/:searchTerm" element={<Search />} />

            <Route path="/item-service/insert" element={<ItemInsert />} />
            <Route path="/item-service2" element={<ItemComp />} />
            <Route path="/item-service" element={<ItemComp2 />} />
            <Route path="/item-service/list" element={<ItemListPaging />} />
            <Route path="/item-service/detail/:id" element={<ItemDetail />} />
            <Route path="/item-service/update/:id" element={<ItemUpdate />} />
            <Route path="/item-service/delete/:id" element={<ItemDelete />} />
            <Route path="/reply-service/list" element={<ReplyList />} />
            <Route path="/reply-service/replys/:id" element={<ReplyUpdate />} />

            <Route path="/order-service/" element={<OrderComp />} />
            <Route path="/order-service/orders/detail/:id" element={<OrderDetail />} />
            <Route path="/order-service/orders/:id" element={<OrderInsert />} />
            <Route path="/order-service/edit" element={<OrderUpdate />} />
            <Route path="/order-service/delete/:id}" element={<OrderDelete />} />
          </Routes>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default Content;
