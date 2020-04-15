
var scriptFolder = ((new File($.fileName)).parent);
var scriptFolder = scriptFolder.fsName;

var vid = prompt("Please enter the video url",'');



var UFC = File([scriptFolder + '\\userFolderCacher.txt']);
UFC.open('r');
var fullTextC = UFC.read();
//alert(fullTextC);
var UF = Folder([fullTextC]);
//alert(UF)
UFC.close();

var done = File([scriptFolder + '\\done.txt']);
done.open('w')
done.encoding = "UTF-8";
done.lineFeed = "Unix";
var fullText = done.write('');
done.close();

done.open('r');
var doneText = done.read();



//var importFolder = Folder.selectDialog("select the folder");
var importFiles = UF.getFiles();
var importAry = [];
for (var i = 0; i <importFiles.length; i++) {
        importAry[i] = importFiles[i].fsName;
    }
alert(importAry);


//WRITE TO BATCH FILE WITH 'vid' AND 'UF' AND CALL THAT Batch FILE
ytBatch = File([scriptFolder + '\\ytdlWindows.bat'])
ytBatch.open('r');
var fullText = ytBatch.read();
//alert(fullText);
ytBatch.close();

ytBatch.open('w')
ytBatch.encoding = "UTF-8";
ytBatch.lineFeed = "Windows"; //One of the values "Windows", "Macintosh", or "Unix".

var fullText = ytBatch.write('cd ', fullTextC );
var fullText = ytBatch.write('\nyoutube-dl -f bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4  ', vid);
//var fullText = ytBatch.write('\necho "youtube vid downloaded for Windows" >> ', done);
var fullText = ytBatch.write('\ncd ',scriptFolder);
var fullText = ytBatch.write('\necho "youtube vid downloaded for Windows" > done.txt');


ytBatch.close()
ytBatch.open('r');
var fullTextG = ytBatch.read();
//alert(fullTextG)
ytBatch.close()
ytBatch.execute();

//COMPARE THE OLD 'UF' LIST AND THE NEW 'UF' LIST 
while (done.length == 0){
    var done2 = File([scriptFolder + '\\done.txt'])
    done2.open('r');
    var doneText = done2.read();
    if (done2.length > 0) {
        done2.close();
        done.close();
        break
    }
}

var importAry2 = [];
var importFiles = UF.getFiles()
while (importAry.length > importAry2.length) {
    for (var i = 0; i < importFiles.length; i++) {
        importAry2[i] = importFiles[i].fsName;
        ////alert(importAry2[i])
    }
  }
alert(importAry + ' is now this');
/*
var finalVid = importAry2.filter(function(obj) { 
    return importAry.indexOf(obj) == -1; 
    
});
*/
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

//var finalVid = (arr_diff(['a', 'b',], ['a', 'b', 'c', 'd','666']));
var finalVid = (arr_diff(importAry, importAry2));

finalVid.pop()
alert(finalVid);
//IMPORT DOWNLOADED VID TO PREMIERE
app.project.importFiles(finalVid,1,app.project.rootItem,0);

done.open('w')
done.encoding = "UTF-8";
done.lineFeed = "Unix";
var fullText = done.write('');
done.close();