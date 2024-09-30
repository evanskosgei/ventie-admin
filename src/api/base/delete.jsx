/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import instance from "./axios";

const Delete = (url, body, params) => instance.delete(url, body, { ...params });
export default Delete;