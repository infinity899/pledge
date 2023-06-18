
export const bottomVisible = () => {
  const { scrollY } = window;
  const visible = document.documentElement.clientHeight;
  const { scrollHeight } = document.documentElement;
  const footerHeight = 328;
  const pageHeight = scrollHeight - footerHeight;
  const bottomOfPage = visible + scrollY >= pageHeight;
  return bottomOfPage || pageHeight < visible;
};

export const copy = (document, text) => {
  const copyTextArea = document.createElement('textarea');
  copyTextArea.value = text;
  document.body.appendChild(copyTextArea);
  copyTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(copyTextArea);
};
