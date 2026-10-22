import {countryNames} from './countries.js';
// Fixed merchant destinations only; no model-generated URLs or claimed offers.
const queries={tea:'ceramic tea set loose leaf tea',journal:'linen journal brass pen',camera:'instant camera',workshop:'pottery workshop',music:'music subscription gift card',garden:'herb garden kit',craft:'paper craft kit',story:'illustrated storybook collection',clothing:'cotton lounge set',accessories:'silk scarf',perfume:'fragrance discovery set',jewellery:'sculptural pendant necklace',shoes:'everyday sneakers',watch:'classic analogue watch',beauty:'skincare discovery set',fitness:'cork yoga mat strap',interiors:'ceramic vase',cooking:'baking tools gift set',gaming:'game store gift card',photography:'phone photography lens kit'};
export const shoppingCountries=countryNames;
export function giftCountry(gift){return gift.country==='EU'?'DE':Object.hasOwn(shoppingCountries,gift.country)?gift.country:({INR:'IN',USD:'US',GBP:'GB',AED:'AE',EUR:'DE'}[gift.currency]||'IN')}
export function shoppingOptions(gift,country){
 if(country==='EU')country='DE';if(!Object.hasOwn(shoppingCountries,country))throw new Error('Unsupported shopping country');
 const query=queries[gift.id]||'thoughtful gifts';const q=encodeURIComponent(query);const amazon={IN:'www.amazon.in',US:'www.amazon.com',GB:'www.amazon.co.uk',AE:'www.amazon.ae',DE:'www.amazon.de'}[country];
 const options=[];const add=(name,url,note,kind='Search gifts')=>options.push({name,url,note,kind});
 if(gift.id==='workshop'){
  add('GetYourGuide',`https://www.getyourguide.com/s/?q=${q}%20${encodeURIComponent(shoppingCountries[country])}`,'Choose a city and check workshop dates.','Search experiences');
  add('Viator',`https://www.viator.com/searchResults/all?text=${q}%20${encodeURIComponent(shoppingCountries[country])}`,'Check the location, age requirements and booking terms.','Search experiences');
  return {query,options};
 }
 if(country==='IN'){
  const fashion={clothing:'lounge-wear',accessories:'scarves',jewellery:'pendants',shoes:'casual-shoes',watch:'watches'};
  if(fashion[gift.id])add('Myntra',`https://www.myntra.com/${fashion[gift.id]}`,'Browse this category; confirm style, size and returns.','Browse category');
  if(['perfume','beauty'].includes(gift.id))add('Nykaa',`https://www.nykaa.com/search/result/?q=${q}`,'Explore beauty and fragrance; check ingredients and sensitivities.');
  add('Amazon India',`https://${amazon}/s?k=${q}`,'Search the Indian marketplace for this gift idea.');
  add('Flipkart',`https://www.flipkart.com/search?q=${q}`,'Compare matching products, sellers and delivery options.');
 }else if(amazon){
  add({US:'Amazon US',GB:'Amazon UK',AE:'Amazon UAE',DE:'Amazon Germany'}[country],`https://${amazon}/s?k=${q}`,'Search the marketplace for your selected country.');
  if(country==='AE')add('Noon',`https://www.noon.com/uae-en/search/?q=${q}`,'Compare matching products from the UAE storefront.');
  else add('eBay',`https://${{US:'www.ebay.com',GB:'www.ebay.co.uk',DE:'www.ebay.de'}[country]}/sch/i.html?_nkw=${q}`,'Check seller location, condition and shipping before purchasing.');
  add('Etsy',`https://www.etsy.com/search?q=${q}`,'Explore independent sellers; confirm shipping to your country.');
 }
 if(!options.length){add('Etsy',`https://www.etsy.com/search?q=${q}`,`Explore independent sellers; confirm shipping to ${shoppingCountries[country]}.`);add('eBay International',`https://www.ebay.com/sch/i.html?_nkw=${q}`,`Search international listings; set delivery to ${shoppingCountries[country]} and check import costs.`)}
 return {query,options};
}
