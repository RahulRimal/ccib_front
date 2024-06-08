import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [],
  activeTab: null,
  endpoint: "",
  loading: false,
};

const formTabsSlice = createSlice({
  name: "formTabs",
  initialState,
  reducers: {
    setFormTabs: (state, action) => {
      state.tabs = action.payload;
      const activeTab =
        action.payload.find((tab) => tab.active) || action.payload[0];
      if (activeTab) {
        state.activeTab = activeTab.id;
        state.endpoint = activeTab.endpoint;
      }
    },
    setActiveFormTab: (state, action) => {
      const activeTabId = action.payload;
      state.tabs = state.tabs.map((tab) => ({
        ...tab,
        active: tab.id === activeTabId,
      }));
      const activeTab = state.tabs.find((tab) => tab.id === activeTabId);
      if (activeTab) {
        state.activeTab = activeTab.id;
        state.endpoint = activeTab.endpoint;
      }
    },
  },
});

export const { setFormTabs, setActiveFormTab } = formTabsSlice.actions;
export default formTabsSlice.reducer;
