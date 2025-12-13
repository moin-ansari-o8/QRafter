import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQRStore = create(
  persist(
    (set, get) => ({
      // QR Configuration
      config: {
        data: "https://github.com/moin-ansari-o8/QRafter",
        size: 512,
        margin: 10,
        dotsColor: "#000000",
        backgroundColor: "#ffffff",
        dotsType: "rounded",
        cornerSquareType: "extra-rounded",
        cornerDotType: "dot",
        errorCorrectionLevel: "M",
        logo: null,
        // New features
        gradient: null,
        pattern: null,
        frame: null,
        frameText: "",
        animation: null,
        filter: null,
      },

      // Active template tracking
      activeTemplate: null,
      activePreset: null,

      // History for undo/redo
      history: [],
      historyIndex: -1,
      maxHistorySize: 50,

      // Presets and Brand Kits
      presets: [],
      brandKits: [],
      recentQRCodes: [],

      // Actions
      setConfig: (newConfig) => {
        const currentConfig = get().config;
        const history = get().history;
        const historyIndex = get().historyIndex;

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(currentConfig);

        if (newHistory.length > get().maxHistorySize) {
          newHistory.shift();
        }

        set({
          config: { ...currentConfig, ...newConfig },
          history: newHistory,
          historyIndex: newHistory.length,
        });
      },

      updateConfig: (key, value) => {
        get().setConfig({ [key]: value });
      },

      setActiveTemplate: (templateName) => {
        set({ activeTemplate: templateName, activePreset: null }); // Clear active preset when template selected
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          set({
            config: history[historyIndex - 1],
            historyIndex: historyIndex - 1,
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set({
            config: history[historyIndex + 1],
            historyIndex: historyIndex + 1,
          });
        }
      },

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      // Preset Management
      savePreset: (name) => {
        const { config, presets } = get();
        const newPreset = {
          id: Date.now(),
          name,
          config: { ...config },
          createdAt: new Date().toISOString(),
        };
        set({ presets: [...presets, newPreset] });
      },

      loadPreset: (id) => {
        const preset = get().presets.find((p) => p.id === id);
        if (preset) {
          get().setConfig(preset.config);
          set({ activeTemplate: null, activePreset: id }); // Track active preset and clear template
        }
      },

      deletePreset: (id) => {
        const { activePreset } = get();
        set({
          presets: get().presets.filter((p) => p.id !== id),
          activePreset: activePreset === id ? null : activePreset, // Clear if deleting active preset
        });
      },

      // Brand Kit Management
      saveBrandKit: (name, logo, colors) => {
        const { brandKits } = get();
        const newKit = {
          id: Date.now(),
          name,
          logo,
          colors,
          createdAt: new Date().toISOString(),
        };
        set({ brandKits: [...brandKits, newKit] });
      },

      loadBrandKit: (id) => {
        const kit = get().brandKits.find((k) => k.id === id);
        if (kit) {
          get().setConfig({
            logo: kit.logo,
            dotsColor: kit.colors.primary,
            backgroundColor: kit.colors.background,
          });
        }
      },

      deleteBrandKit: (id) => {
        set({ brandKits: get().brandKits.filter((k) => k.id !== id) });
      },

      // Recent QR Codes
      addToRecent: (qrData) => {
        const { recentQRCodes } = get();
        const newRecent = {
          id: Date.now(),
          config: { ...get().config },
          thumbnail: qrData,
          createdAt: new Date().toISOString(),
        };

        const updated = [newRecent, ...recentQRCodes].slice(0, 10);
        set({ recentQRCodes: updated });
      },

      clearRecent: () => set({ recentQRCodes: [] }),

      // Reset to defaults
      reset: () => {
        set({
          config: {
            data: "https://github.com/moin-ansari-o8/QRafter",
            size: 512,
            margin: 10,
            dotsColor: "#000000",
            backgroundColor: "#ffffff",
            dotsType: "rounded",
            cornerSquareType: "extra-rounded",
            cornerDotType: "dot",
            errorCorrectionLevel: "M",
            logo: null,
            gradient: null,
            pattern: null,
            frame: null,
            frameText: "",
            animation: null,
            filter: null,
          },
        });
      },
    }),
    {
      name: "qrafter-storage",
      partialize: (state) => ({
        presets: state.presets,
        brandKits: state.brandKits,
        recentQRCodes: state.recentQRCodes,
      }),
    }
  )
);

export default useQRStore;
