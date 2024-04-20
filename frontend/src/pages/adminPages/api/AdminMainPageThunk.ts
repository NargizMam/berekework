import {createAsyncThunk} from "@reduxjs/toolkit";
import {Company} from "../../HeadingAdmin/model/types";
import axiosApi from "../../../app/axios";

export const getCompanyInfo = createAsyncThunk<Company>(
    'admin/getCompanyInfo',
    async () => {
        const result = await axiosApi.get<Company>('/header?logo');
        console.log(result.data);
        return result.data;
    }
);