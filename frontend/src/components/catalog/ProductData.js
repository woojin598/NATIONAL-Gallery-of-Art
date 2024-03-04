// import React from 'react';
// // import Catalog from "react-catalog-view";

// function ProductData(props){
//   let products =
//    [
//      {
//         id: 1,
//         title: "Canvas",
//         description: "High quality canvas shoes.",
//         price: "20",
//         discounted: "15",
//         currency: "$",
//         image: "http://domain.com/images/1.jpg",
//      },
//      {
//         id: 2,
//         title: "Sport shoes",
//         description: "Sporty shoes, durable at affordable ranges.",
//         price: "25",
//         currency: "$",
//         discounted: "15",
//         image: "http://domain.com/images/5.jpg",
//      },
//      {
//         id: 3,
//         title: "Heels",
//         description: "Fashionable trendy heels.",
//         currency: "$",
//         price: "30",
//         image: "http://domain.com/images/6.jpg",
//      }
//   ];

//   const CONTENT_KEYS =
//   {
//      imgKey: "image",
//      cardTitleKey: "title",
//      cardDescriptionKey: "description",
//      priceKey: "price",
//      discountedPriceKey: "discounted",
//      priceCurrencyKey: "currency",
//      discountCurrencyKey: "currency"
//   };

//   return(
//     <Catalog
//        data = {products}
//        // Array of JSON Objects (required)
//        contentKeys={CONTENT_KEYS}
//        // JSON Object defining the keys that will be
//        // used from the data array, keys should match. (required)
//        skeleton={0}
//        // Any non zero number will override default cards
//        // and will show that many skeleton cards.
//        cardSize="sm"
//        // Card sizes, sm, md and lg for small, medium  and large
//        btnOneText="View"
//        // Enter text for action button one
//        // or pass empty string to hide.
//        btnTwoText="Purchase Now"
//        // Enter text for action button two
//        // or pass empty string to hide.
//        btnOneHandler={(args, event, objectData)=>{
//         // 'objectData' returns object data from 'data' prop
//         // any arguments passed will be before 'event'
//         // and 'objectData'
//        }}
//        btnTwoHandler={(args, event, row)=>{
//         // 'objectData' returns object data from 'data' prop
//         // any arguments passed will be before 'event'
//         // and 'objectData'
//        }}
//        imageClickHandler={(args, event, row)=>{
//         // 'objectData' returns object data from 'data' prop
//         // any arguments passed will be before 'event'
//         // and 'objectData'
//        }}
//        cardControls={ dataObj => {
//            return(
//               <div>
//                  <input className='my-custom-input' placeholder='custom-input' />
//                  <button className='my-custom-button' type='submit'> OK </button>
//               </div>
//            )
//         }
//         // Pass a function which returns JSX to be rendered inside card
//         // This function will have 'dataObj' containing JSON of
//         // the item each card represents
//     />
//   )
// }

import React from "react";

function ProductData() {
  return <div>ProductData</div>;
}

export default ProductData;
