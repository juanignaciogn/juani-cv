
const StyleBundler = (Style) => {
  let output = '';
  const styles = Style.rewind();
  Object.keys(styles).map((key) => output += `<link href="${styles[key].href}" rel="stylesheet" type="text/css" />`);

  return output;
};

export default StyleBundler;
