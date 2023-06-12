import api from ".";
import urlcat from "urlcat";
import { transformTestimonialList, transformTopListingCompanies } from "./transform/home";
export const getTopListingCompaniesAPI = async () => {
    const response = await api.request({
        url: urlcat("/v1/admin/upload-logo"),
        method: "GET",
    });
    if (response.remote === "success") {
        return {
            remote: "success",
            data: response.data.map((data) => transformTopListingCompanies(data)),
        };
    }
    return response;
};

export const getTestimonialListAPI = async () => {
    const response = await api.request({
        url: urlcat("v1/admin/testimonial"),
        method: "GET",
    });
    if (response.remote === "success") {
        return {
            remote: "success",
            data: transformTestimonialList(response.data),
        };
    }
    return response;
};

export const storeNewsletterAPI = async (email) => {
    const response = await api.request({
        url: urlcat("v1/admin/newsletter-user"),
        method: "POST",
        data: { email },
    });
    if (response.remote === "success") {
        return {
            remote: "success",
        };
    }
    return {
        remote: "failure",
        error: response.error.errors.email,
    };
};
