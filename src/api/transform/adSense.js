export const transformAdSenseResponse = (data) => {
    return data.map((item) => ({
        id: item.id || "",
        pageName: item.page_title || "",
        code: item.code || "",
    }));
};
