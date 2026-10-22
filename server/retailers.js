/** Future adapters must provide search(query, {country,currency,budget,deliveryDate})
 * -> Promise<Array<{id,title,url,price,currency,availability,deliveryEstimate,verifiedAt}>>.
 * Validate HTTPS retailer URLs against a merchant allowlist, currency and freshness
 * before exposing offers. Never use model-generated prices or delivery as offers.
 */
export class RetailerAdapter { async search(_query,_constraints){throw new Error('Retailer adapter is not configured')} }
export const retailers=[];
