import {
    defaultDetailsState,
    detailsSchema,
} from '@/types/details';
import { createPersistedStore } from '@/types/store/base';
  
export const useDetailsStore = createPersistedStore(
    'details',
    defaultDetailsState,
    detailsSchema,
    'detailsState',
    'setDetailsState',
);
  