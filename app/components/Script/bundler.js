const ScriptBundler = (Script) => {
    let output = '';
    const script = Script.rewind();
    Object.keys(script).map((key) => {
        output += `<script src="${script[key].src}"></script>`;
    });
    console.log(output);
    return output;
};

export default ScriptBundler;
