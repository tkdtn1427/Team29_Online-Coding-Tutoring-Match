import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetSkills } from '../../utils/apis/API/SkillAPI';

const TagList = createAsyncThunk('GET_SKILLS', () => {
  const response = GetSkills();
  return response;
});

const TagReducer = createSlice({
  name: 'tagslist',
  initialState: { tags: [], filteringTags: [], loading: 'true' },
  reducers: {
    searchByAlpha: (state, action) => {
      const filteringTags = state.tags.filter(tag => tag.name.toLowerCase().includes(action.payload.toLowerCase()));
      return {
        ...state,
        filteringTags: [...filteringTags],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(TagList.pending, state => {
        state.loading = true;
      })
      .addCase(TagList.fulfilled, (state, { payload }) => {
        state.tags = [...payload];
        state.filteringTags = [...payload];
        state.loading = false;
      })
      .addCase(TagList.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});

export { TagList, TagReducer };
