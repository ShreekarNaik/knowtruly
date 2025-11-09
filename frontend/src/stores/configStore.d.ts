interface ConfigState {
    useDemoData: boolean;
    apiBaseUrl: string;
    setUseDemoData: (value: boolean) => void;
    toggleDemoData: () => void;
}
export declare const useConfigStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ConfigState>>;
export {};
