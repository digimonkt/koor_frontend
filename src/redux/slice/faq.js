import { getFAQQuestionsAPI } from "../../api/faq";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  faqQuestions: {
    loading: false,
    data: [],
  },
};

export const getFAQQuestions = createAsyncThunk(
  "faq/faqQuestions",
  async (data, { rejectWithValue }) => {
    const res = await getFAQQuestionsAPI(data);
    if (res.remote === "success") {
      return {
        categoryId: data.categoryId,
        data: res.data,
      };
    } else {
      return rejectWithValue(res.error);
    }
  }
);
export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    resetFAQQuestions: (state, action) => {
      state.faqQuestions = initialState.faqQuestions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFAQQuestions.fulfilled, (state, action) => {
      state.faqQuestions = {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(getFAQQuestions.pending, (state) => {
      state.faqQuestions = {
        ...state.faqQuestions,
        loading: true,
      };
    });
    builder.addCase(getFAQQuestions.rejected, (state) => {
      state.faqQuestions = {
        ...state.faqQuestions,
        loading: false,
      };
    });
  },
});
export const { resetFAQQuestions } = faqSlice.actions;
export default faqSlice.reducer;
