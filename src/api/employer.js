import api from ".";
import urlcat from "urlcat";
import {
  transformFullJobDetails,
  transformJobListResponse,
} from "./transform/job";
import {
  getDashboardActivityAPIResponseTransform,
  transformApplicationOnJobListData,
  transformApplicationOnTenderListData,
  transformApplicationTenderListData,
} from "./transform/employer";
import { transformGetUserDetails } from "./transform/user";
import { transformTenderResponse } from "./transform/tender";
import { transformBlacklistUser } from "./transform/blacklist";

export const createJobAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/employer/jobs"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res;
};

export const getEmployerJobsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/employer/jobs", data || {}),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformJobListResponse(res.data),
    };
  }
  return res;
};
export const updateEmployerAboutMe = async (data) => {
  const response = await api.request({
    url: "/v1/users/employer/about-me",
    method: "PATCH",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateEmployerJobAPI = async (jobId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/jobs/:jobId", { jobId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateEmployerJobStatusAPI = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/jobs/:jobId/status", { jobId }),
    method: "PUT",
  });
  return response;
};
export const updateEmployerTenderStatusAPI = async (tendersId) => {
  const response = await api.request({
    url: urlcat("v1/users/employer/tenders/:tendersId/status", { tendersId }),
    method: "PUT",
  });
  return response;
};

export const getApplicationOnJobAPI = async ({ jobId, filter }) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:jobId/applications", { jobId, filter }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformApplicationOnJobListData(response.data),
    };
  }
  return response;
};

export const getRecentApplicationAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/applications", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformApplicationOnJobListData(response.data),
    };
  }
  return response;
};

export const getApplicationDetailsAPI = async (applicationId) => {
  const res = await api.request({
    url: urlcat("/v1/jobs/applications-detail/:applicationId", {
      applicationId,
    }),
    method: "GET",
  });
  if (res.remote === "success") {
    res.data.user.profile = {
      ...(res.data.user.profile || {}),
      description: res.data.user.description,
    };
    return {
      remote: "success",
      data: {
        id: res.data.id,
        createdAt: res.data.created,
        job: res.data.job,
        isInterviewPlanned: res.data.interview_at,
        rejectedAt: res.data.rejected_at,
        shortLetter: res.data.short_letter,
        shortlistedAt: res.data.shortlisted_at,
        attachments: res.data.attachments,
        user: {
          ...transformGetUserDetails(res.data.user),
          isBlacklisted: res.data.user.is_blacklisted,
        },
      },
    };
  }
  return res;
};

export const changeApplicationStatusAPI = async ({
  action,
  applicationId,
  data,
}) => {
  const res = await api.request({
    url: urlcat("/v1/jobs/applications-detail/:applicationId/:action", {
      applicationId,
      action,
    }),
    method: "PUT",
    data,
  });
  return res;
};

export const getDashboardActivityAPI = async () => {
  const res = await api.request({
    url: "v1/users/employer/activity",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: getDashboardActivityAPIResponseTransform(res.data),
    };
  }
  return res;
};
export const getJobAnalyticsAPI = async () => {
  const res = await api.request({
    url: "v1/users/employer/job-analysis",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: { orderCounts: res.data.order_counts },
    };
  }
  return res;
};

export const createTenderAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/employer/tenders"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res;
};

export const getShareCountDataAPI = async () => {
  const res = await api.request({
    url: "v1/users/employer/share-count",
    method: "GET",
  });
  if (res.method === "success") {
    return {
      remote: "success",
      data: res.data,
    };
  }
  return res;
};

export const getTenderAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/tenders", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformTenderResponse(response.data),
    };
  }
  return response;
};

export const updateTenderAPI = async (tendersId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/tenders/:tendersId", { tendersId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getBlacklistAPI = async (search) => {
  const response = await api.request({
    url: urlcat("v1/users/employer/blacklisted-user", search),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformBlacklistUser(response.data),
    };
  }
  return response;
};
export const getEmployerActiveJobsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/active-jobs/:employerId", data),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: response.data.results.map((data) =>
          transformFullJobDetails(data)
        ),
      },
    };
  }
  return response;
};

export const getApplicationOnTenderAPI = async ({ tenderId, filter }) => {
  const response = await api.request({
    url: urlcat("/v1/tenders/:tenderId/applications", { tenderId, filter }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformApplicationTenderListData(response.data),
    };
  }
  return response;
};

export const getRecentTenderApplicationAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/tenders/applications", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformApplicationOnTenderListData(response.data),
    };
  }
  return response;
};
export const getTenderApplicationDetailsAPI = async (applicationId) => {
  const res = await api.request({
    url: urlcat("/v1/tenders/applications-detail/:applicationId", {
      applicationId,
    }),
    method: "GET",
  });
  if (res.remote === "success") {
    res.data.user.profile = {
      ...(res.data.user.profile || {}),
      description: res.data.user.description,
    };
    return {
      remote: "success",
      data: {
        id: res.data.id,
        createdAt: res.data.created,
        tender: res.data.tender,
        isInterviewPlanned: res.data.interview_at,
        rejectedAt: res.data.rejected_at,
        shortLetter: res.data.short_letter,
        shortlistedAt: res.data.shortlisted_at,
        attachments: res.data.attachments,
        user: {
          ...transformGetUserDetails(res.data.user),
          isBlacklisted: res.data.user.is_blacklisted,
        },
      },
    };
  }
  return res;
};
