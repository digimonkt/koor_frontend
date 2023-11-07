import { getAdSenseAPI } from "@api/adSense";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
    adSense: {
        data: [],
        loading: false,
    },
};

export const getAdSense = createAsyncThunk("adSense/getAdSense",
    async (payload, { rejectWithValue }) => {
        const res = await getAdSenseAPI({ ...payload });
        if (res.remote === "success") {
            return res.data;
        } else {
            return rejectWithValue(res.error);
        }
    }
);

export const adSenseSlice = createSlice({
    name: "adSense",
    initialState,
    reducers: {
        setAdSense: (state, action) => {
            state.adSense = {
                data: action.payload,
                loading: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdSense.fulfilled, (state, action) => {
            state.adSense = {
                loading: false,
                data: action.payload.results,
                count: action.payload.count,
            };
        });
        builder.addCase(getAdSense.pending, (state) => {
            state.adSense = {
                loading: true,
                data: [],
            };
        });
        builder.addCase(getAdSense.rejected, (state) => {
            state.adSense = {
                ...state.adSense,
                loading: false,
            };
        });
    }
});
export const {
    setAdSense,
} = adSenseSlice.actions;
export default adSenseSlice.reducer;
