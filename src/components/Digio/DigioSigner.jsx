
import React, { forwardRef, useImperativeHandle } from 'react';
import useDigio from '../../hooks/useDigio';

const DigioSigner = forwardRef(({
  documentIds,
  identifier,
  environment = 'production',
  accessToken,
  onSuccess,
  onError,
  onCancel
}, ref) => {
  const { isLoading, error, startSigning, isReady } = useDigio({
    environment,
    accessToken,
    is_iframe: false,
    onSuccess,
    onError,
    onCancel,
    onEvent: (e) => console.log('Digio Event:', e),
  });

  // Expose an imperative "open" that starts signing when ready
  useImperativeHandle(ref, () => ({
    open: () => {
      if (!isReady) {
        console.warn('Digio not ready yet');
        return;
      }
      if (!documentIds?.length) {
        console.warn('No documentIds provided');
        return;
      }
      startSigning([documentIds[0]], identifier);
    }
  }), [isReady, documentIds, identifier, startSigning]);

  if (isLoading) return null;           // keep UI clean; modal has its own loader
  if (error) return null;               // surface errors in parent if needed

  // Optional fallback button (useful during dev); safe to keep or remove
  return (
    <button
      onClick={() => isReady && startSigning([documentIds], identifier)}
      disabled={!isReady}
      className="hidden"
    >
      Start Signing
    </button>
  );
});

export default DigioSigner;
