import axios from "axios";

export const GET_ONE_WAY_FLIGHTS = "/api/flights/oneWay";
export const GET_TWO_WAY_FLIGHTS = "/api/flights/twoWay";
export const GET_AIRLINE = "/api/flights/airline";
export const GET_RECOMMENDED = "/api/flights/recommended";

export function getOneWayFlights({origin,destination,depart,adults,child}) {
  return axios.get(`${GET_ONE_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}`);
}
export function getTwoWayFlights({origin,destination,depart,return: returnDate,adults,child}) {
  return axios.get(`${GET_TWO_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}&returnDate=${returnDate}`);
}

export function getAirline({airlineCodes}) {
  return axios.get(`${GET_AIRLINE}?airlineCodes=${airlineCodes}`);
}
export function getRecommended() {
  return axios.get(GET_RECOMMENDED);
}
