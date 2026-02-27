let _supportsWebGL2: boolean | null = null;

export function supportsWebGL2(): boolean {
  if (_supportsWebGL2 !== null) return _supportsWebGL2;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    _supportsWebGL2 = gl !== null;
    if (gl) {
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
    return _supportsWebGL2;
  } catch {
    _supportsWebGL2 = false;
    return false;
  }
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
