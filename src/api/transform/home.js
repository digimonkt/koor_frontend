export const transformTopListingCompanies = (data) => {
    return {
        id: data.id,
        logo: {
            id: data.logo.id,
            path: data.logo.path,
            title: data.logo.title,
        },
    };
};
export const transformTestimonialList = (data) => {
    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        result: data.results.map((item) => ({
            id: item.id,
            title: item.title,
            clientName: item.client_name,
            clientCompany: item.client_company,
            clientPosition: item.client_position,
            description: item.description,
            image: {
                id: item.image?.id || null,
                title: item.image?.title || null,
                type: item.image?.type || null,
                path: item.image?.path || null,
            }
        })),
    };
};
