/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import instance from "./axios";

const get = (url, body, params) => instance.get(url, body, { ...params });
export default get;
