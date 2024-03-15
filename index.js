const fs = require('fs');

function convertImageToBase64(filePath) {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    const base64String = Buffer.from(imageBuffer).toString('base64');
    return `data:image/${filePath.split('.').pop()};base64,${base64String}`;
  } catch (error) {
    console.error(`Error converting image: ${filePath}`, error);
    return null;
  }
}

function convertMarkdownImages(markdownFilePath) {
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
  const lines = markdownContent.split('\n');
  const updatedLines = lines.map(line => {
    // Regex to match local image URLs (replace with your desired pattern)
    const match = line.match(/!\[.*\]\((.*)\)/);
    if (match) {
      const imagePath = match[1];
      const base64String = convertImageToBase64(imagePath);
      if (base64String) {
        return line.replace(match[0], `![](${base64String})`);
      }
    }
    return line;
  });
  return updatedLines.join('\n');
}

module.exports = {
  convertImageToBase64,
  convertMarkdownImages,
};
