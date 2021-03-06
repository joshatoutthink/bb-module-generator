const archiver = require("archiver");
const fs = require("fs");
async function zipModule(moduleName) {
  const source = `./mods/${moduleName}`;
  const out = `./${moduleName}.zip`;
  await zipDirectory(source, out);
}

function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
module.exports = { zipModule };
