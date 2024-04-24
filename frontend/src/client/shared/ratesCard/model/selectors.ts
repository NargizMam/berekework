import { RootState } from '../../../../app/store/store.ts';


export const selectRates= (state: RootState) => state.tariff.items;
export const selectAlbumsLoading = (state: RootState) => state.tariff.fetchAllLoading;