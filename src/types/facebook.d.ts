declare global {
  interface Window {
    FB?: {
      init: (config: { xfbml: boolean; version: string }) => void;
      CustomerChat: {
        showDialog: () => void;
        hideDialog: () => void;
      };
    };
  }
}

export {}; 