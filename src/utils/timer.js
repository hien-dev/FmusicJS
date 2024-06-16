export const msToTime = ms => {
  const hours = Math.floor(ms / 3600);

  const minutes = Math.floor((ms - hours * 3600) / 60);

  const seconds =
    ms > 3600
      ? Math.floor(ms - hours * 3600 - minutes * 60)
      : Math.floor(ms % 60);

  const pad = i => (i < 10 ? `0${i}` : i);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
