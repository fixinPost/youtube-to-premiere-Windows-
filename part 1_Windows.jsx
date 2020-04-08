//FOR WINDOWS 
var UF = Folder.selectDialog('select folder to import!');
alert(UF);
var scriptFolder = ((new File($.fileName)).parent);
alert(scriptFolder);
alert(scriptFolder.fsName);
var UFC = File([scriptFolder +'/userFolderCacher.txt']);
UFC.open('w');
UFC.encoding = "UTF-8";
UFC.lineFeed = "Windows"; //One of the values "Windows", "Macintosh", or "Unix".
var fullText = UFC.write(UF.fsName);
UFC.close();



