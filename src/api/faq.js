import api from ".";
import urlcat from "urlcat";
import { transformFAQCategory, transformFAQQuestion } from "./transform/faq";
export const getFAQCategoryAPI = async (role) => {
    const res = await api.request({
        url: urlcat("/v1/admin/faq-category", role),
        method: "GET",
    });
    if (res.remote === "success") {
        return {
            remote: "success",
            data: transformFAQCategory(res.data),
        };
    }
    return res;
};

export const getFAQQuestionsAPI = async (data) => {
    const params = {
        role: data.role,
        faqCategoryId: data.categoryId,
    };
    const res = await api.request({
        url: urlcat("v1/admin/:role/faq/:faqCategoryId", params),
        method: "GET",
    });
    if (res.remote === "success") {
        return {
            remote: "success",
            data: transformFAQQuestion(res.data),
        };
    }
};
