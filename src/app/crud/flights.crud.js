import axios from "axios";

export const GET_ONE_WAY_FLIGHTS = "/api/flights/oneWay";
export const GET_TWO_WAY_FLIGHTS = "/api/flights/twoWay";

export function getOneWayFlights({origin,destination,oneWay,depart,return: returnDate,adults,child}) {
  return axios.get(`${GET_ONE_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}`);
}
export function getTwoWayFlights({origin,destination,depart,return: returnDate,adults,child}) {
  return axios.get(`${GET_TWO_WAY_FLIGHTS}?origin=${origin}&destination=${destination}&depart=${depart}&adults=${adults}&child=${child}&returnDate=${returnDate}`);
}
