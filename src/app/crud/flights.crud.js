import axios from "axios";

export const GET_ONE_WAY_FLIGHTS = "/api/flights/oneWay";
export const GET_TWO_WAY_FLIGHTS = "/api/flights/twoWay";
export const GET_AIRLINE = "/api/flights/airline";
export const GET_RECOMMENDED = "/api/flights/recommended";
export const GET_USER_TRIPS = "/api/flights/user-trips";
export const GET_ALL_TRIPS = "/api/flights/all-trips";
export const BOOK_FLIGHT = "/api/flights/book";
export const CHANGE_FLIGHT_STATUS = "/api/flights/status";
export const CHECKOUT_PAYMENT = "/api/flights/confirm";
export const BOOK_WORLD_TOUR = "/api/flights/world-tour/book";
export const DELETE_WORLD_TOUR_PACKAGE =
  "/api/flights/world-tour/delete-package";
export const DELETE_UMRAH_DEAL_PACKAGE =
  "/api/flights/umrah-deals/delete-package";
export const CREATE_WORLD_TOUR = "/api/flights/create/world-tour/images";
export const CREATE_UMRAH_DEALS = "/api/flights/create/umrah-deals/images";
export const GET_WORLD_TOUR = "/api/flights/world-tour";
export const GET_UMRAH_DEALS = "/api/flights/umrah-deals";
export const GET_WORLD_TOUR_PACKAGE = "/api/flights/world-tour/package";
export const GET_UMRAH_DEAL_PACKAGE = "/api/flights/umrah-deals/package";

export function getOneWayFlights({
  origin,
  destination,
  depart,
  adults,
  child
}) {
  return axios.get(
    `${GET_ONE_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}`
  );
}
export function getTwoWayFlights({
  origin,
  destination,
  depart,
  return: returnDate,
  adults,
  child
}) {
  return axios.get(
    `${GET_TWO_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}&returnDate=${returnDate}`
  );
}

export function getAirline({ airlineCodes }) {
  return axios.get(`${GET_AIRLINE}?airlineCodes=${airlineCodes}`);
}
export function getRecommended() {
  return axios.get(GET_RECOMMENDED);
}

export function bookFlight({ details, userId }) {
  return axios.post(BOOK_FLIGHT, { details, userId });
}

export function changeFlightStatus({ flightId, status }) {
  return axios.put(CHANGE_FLIGHT_STATUS, { flightId, status });
}
export function checkoutForPayment({ token, amount, flightId }) {
  return axios.post(CHECKOUT_PAYMENT, { token, amount, flightId });
}

export function bookWorldTour(data) {
  return axios.post(BOOK_WORLD_TOUR, data);
}

export function deleteWorldTourPackage(data) {
  return axios.put(DELETE_WORLD_TOUR_PACKAGE, data);
}

export function deleteUmrahDealPackage(data) {
  return axios.put(DELETE_UMRAH_DEAL_PACKAGE, data);
}

export function createWorldTour(data) {
  return axios.post(CREATE_WORLD_TOUR, data);
}

export function createUmrahDeals(data) {
  return axios.post(CREATE_UMRAH_DEALS, data);
}

export function getWorldTour() {
  return axios.get(GET_WORLD_TOUR);
}
export function getUmrahDeals() {
  return axios.get(GET_UMRAH_DEALS);
}
export function getWorldTourPackage({ country, packageId }) {
  return axios.get(
    `${GET_WORLD_TOUR_PACKAGE}?country=${country}&packageId=${packageId}`
  );
}
export function getUmrahDealPackage({ dealId }) {
  return axios.get(`${GET_UMRAH_DEAL_PACKAGE}?dealId=${dealId}`);
}

export function getUserTrips(userId) {
  return axios.get(`${GET_USER_TRIPS}/${userId}`);
}

export function getAllTrips() {
  return axios.get(GET_ALL_TRIPS);
}
