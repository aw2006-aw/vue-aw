const fs = require('fs');
const { execSync } = require('child_process');
fs.copyFileSync('C:/Users/敖旺/Desktop/部署到GitHub Pages.docx', 'C:/temp/deploy.docx');
const vbs = `Set objWord = CreateObject("Word.Application")
objWord.Visible = False
Set objDoc = objWord.Documents.Open("C:\\temp\\deploy.docx")
text = objDoc.Content.Text
objDoc.Close
objWord.Quit
Set f = CreateObject("Scripting.FileSystemObject")
Set out = f.CreateTextFile("C:\\temp\\deploy_content.txt", True, True)
out.Write text
out.Close
`;
fs.writeFileSync('C:/temp/read.vbs', vbs, 'ascii');
try {
  execSync('cscript //nologo C:\\temp\\read.vbs', { timeout: 30000 });
  const buf = fs.readFileSync('C:/temp/deploy_content.txt');
  console.log(buf.toString('utf16le'));
} catch(e) { console.error('Error:', e.message); }
