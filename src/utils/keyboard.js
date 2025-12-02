import { useEffect } from 'react';

export const useKeyboardShortcuts = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl/Cmd + D - Download
      if (ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        handlers.download?.();
      }

      // Ctrl/Cmd + S - Save
      if (ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handlers.save?.();
      }

      // Ctrl/Cmd + Z - Undo
      if (ctrlKey && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handlers.undo?.();
      }

      // Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z - Redo
      if ((ctrlKey && e.key.toLowerCase() === 'y') || (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z')) {
        e.preventDefault();
        handlers.redo?.();
      }

      // Space - Toggle Preview
      if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handlers.togglePreview?.();
      }

      // T - Toggle Theme
      if (e.key.toLowerCase() === 't' && !ctrlKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handlers.toggleTheme?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
