export const toHumanReadableSize = (sizeInBytes: number | undefined): string => {
  if (typeof sizeInBytes !== "number" || isNaN(sizeInBytes)) {
    return "N/A";
  }
  if (sizeInBytes < 0) {
    return "0 B";
  }
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
