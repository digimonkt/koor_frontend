import urlcat from "urlcat";
import api from ".";
import { transformAdSenseResponse } from "./transform/adSense";

export const getAdSenseAPI = async () => {
    const response = await api.request({
        url: urlcat("v1/admin/google-add-sense-code"),
        method: "GET",
    });
    if (response.remote === "success") {
        return {
            remote: "success",
            data: transformAdSenseResponse(response.data),
        };
    }
    return response;
};
