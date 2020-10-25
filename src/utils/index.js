export function removeHTMLTags(html, limit) {
  let regX = /(<([^>]+)>)/gi;
  let converted = html?.replace(regX, "");
  return limit && converted?.length > limit
    ? converted?.substring(0, limit)
    : converted;
}
export const getRatings = reviews => {
  let rating = 0;
  reviews.map(review => {
    rating += parseInt(review.rating);
  });
  return reviews.length === 0 ? 0 : (rating / reviews.length).toFixed(2);
};
