import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyHeader from '../../../MyHeader';
import Main from '../../main/Main';
import Footer from '../../footer/Footer';
import QuoteBox from '../../about/QuoteBox';
import Contact from '../../contact/Contact';
import MemberList from '../../admin/MemberList';

import MemberDelete from '../MemberDelete';
import MemberUpdate from '../MemberUpdate';
import MemberDetail from '../MemberDetail';
import MemberLogin from '../MemberLogin';
import MemberInsert from '../MemberInsert';
import MemberComp from '../MemberComp';
import MemberOrder from './member/MemberOrder';

import ItemInsert from '../../item/ItemInsert';
import ItemDetail from '../../item/ItemDetail';
import ItemComp from '../../item/ItemComp';
import ItemList from '../../item/ItemList';
import ItemUpdate from '../../item/ItemUpdate';
import ItemDelete from '../../item/ItemDelete';


import SearchComponent from '../../item/SearchComp';
import ReplyList from '../../reply/ReplyList';
import MemberUpdatePasswd from '../MemberUpdatePasswd';
import ReplyUpdate from '../../reply/ReplyUpdate';
import ItemListPaging from '../../item/ItemListPaging';
import OrderComp from '../../order/OrderComp';
import OrderDetail from '../../order/OrderDetail';
import OrderInsert from '../../order/OrderInsert';
import OrderUpdate from '../../order/OrderUpdate';
import OrderDelete from '../../order/OrderDelete';
import PrivacyPolicy from '../agree/PrivacyPolicy';
import TermsofService from '../agree/TermsofService';






function Content() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <MyHeader />
        </header>
        <div>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/about' element={<QuoteBox />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/member-service/login' element={<MemberLogin />} />
            <Route path='/member-service/delete/:username' element={<MemberDelete />} />
            <Route path='/member-service/update/:username' element={<MemberUpdate />} />
            <Route path='/member-service/update/MemberUpdatePasswd/:username' element={<MemberUpdatePasswd />} />
            <Route path='/member-service/detail/:username' element={<MemberDetail />} />
            <Route path='/member-service/insert' element={<MemberInsert />} />
            <Route path='/member-service/list' element={<MemberList />} />
            <Route path='/member-service' element={<MemberComp />} />
            <Route path='/member-service/orders/:username' element={<MemberOrder />} />

            <Route path='/NATIONALGalleryofArt/privacy' element={<PrivacyPolicy />} />
            <Route path='/NATIONALGalleryofArt/Terms' element={<TermsofService />} />

            <Route path='/item-service/list' element={<ItemList />} />
            <Route path="/item-service/search/:searchTerm" element={<SearchComponent />} />
            <Route path='/item-service/insert' element={<ItemInsert />} />
            <Route path='/item-service' element={<ItemComp />} />
            <Route path='/item-service/list' element={<ItemListPaging />} />
            <Route path='/item-service/detail/:id' element={<ItemDetail />} />
            <Route path='/item-service/update/:id' element={<ItemUpdate />} />
            <Route path='/item-service/delete/:id' element={<ItemDelete />} />
            <Route path='/reply-service/list' element={<ReplyList />} />
            <Route path='/reply-service/replys/:id' element={<ReplyUpdate />} />

            <Route path='/order-service/' element={<OrderComp />} />
            <Route path='/order-service/orders/detail/:id' element={<OrderDetail />} />
            <Route path='/order-service/orders/:id' element={<OrderInsert />} />
            <Route path='/order-service/edit' element={<OrderUpdate />} />
            <Route path='/order-service/delete/:id}' element={<OrderDelete />} />

          </Routes>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default Content
