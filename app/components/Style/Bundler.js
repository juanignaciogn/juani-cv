
const StyleBundler = (Style) => {
    let output = '';
    const styles = Style.rewind();
    Object.keys(styles).map((key) => {
        output += `<link href="${styles[key].href}" rel="stylesheet" type="text/css" />`;
    });
    console.log(output);
    return output;
};

export default StyleBundler;
