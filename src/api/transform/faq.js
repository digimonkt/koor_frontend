export const transformFAQCategory = (data) => {
    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: (data.results || []).map((item) => ({
            id: item.id,
            role: item.role,
            title: item.title,
        })),
    };
};

export const transformFAQQuestion = (data) => {
    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        result: (data.results || []).map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            category: {
                id: item.category.id,
                title: item.category.title,
            },
            role: item.role,
            status: item.status
        })),
    };
};
