const fs = require("fs");

const file = fs.readFileSync("dex.csv", "utf-8").split(/[\r\n|\r|\n]/g);

const extracted = [];

const curatedList = new Set(fs.readFileSync("curated.txt", "utf-8").replace(/\(\d+\)|\r\n|\r|\n/g, "").split(",").map(entry => entry.trim()));

file.forEach((line, index) => {
    if (index === 0) return;

    const fields = line.split(",");
    if (fields.length <= 1) return;
    if (!curatedList.has(fields[3])) return;

    extracted.push({ n: Number(fields[0]), name: fields[3], type1: fields[7], type2: fields[8], ab1: fields[9], ab2: fields[10], ab3: fields[11],
        hp: Number(fields[25]), att: Number(fields[26]), def: Number(fields[27]), spa: Number(fields[28]), spdf: Number(fields[29]), spd: Number(fields[30]) });
});

const output = `[${extracted.map(mon => "\n    " + JSON.stringify(mon))}\n]`;
fs.writeFileSync("out.txt", output, { encoding: "utf-8" });