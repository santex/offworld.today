<?php require('includes/config.php'); 
$case = isset($_REQUEST['case'])?$_REQUEST['case']:1342;
$address="";
$stmt = $db->query(sprintf('SELECT id,caseID,postTitle,urls,tags where caseID=%s',$case));
	$row = $stmt->fetch()){
	print_r($row);
?>
{"COLUMNS":["DISP_NUM",
"EVENT_NUM",
"STORYTEXT",
"IMAGENAME",
"IMAGENAMETHUMB",
"IMAGENAMELARGE",
"DISCIPLINE",
"DATE_STRING",
"TITLE",
"EDITORIAL_NUM",
"CURATEDBY"],"DATA":[

[2,68782,"ODC Theater's \"Take 5\"",
"http://www.sfarts.org/podFotos/take5.jpg",
"http://www.sfarts.org/podFotos/thumb/take5.jpg",
"http://www.sfarts.org/podFotos/large/take5.jpg",
"Dance",
"Sept. 9",
"Take 5",9300,"Heather Desaulniers"]
,
[3,68782,"ODC Theater's \"Take 5\"",
"http://www.sfarts.org/podFotos/take5.jpg",
"http://www.sfarts.org/podFotos/thumb/take5.jpg",
"http://www.sfarts.org/podFotos/large/take5.jpg",
"Dance",
"Sept. 9",
"Take 5",9300,"Heather Desaulniers"]
,
[4,68782,"ODC Theater's \"Take 5\"",
"http://www.sfarts.org/podFotos/take5.jpg",
"http://www.sfarts.org/podFotos/thumb/take5.jpg",
"http://www.sfarts.org/podFotos/large/take5.jpg",
"Dance",
"Sept. 9",
"Take 5",9300,"Heather Desaulniers"]
,
[5,68782,"ODC Theater's \"Take 5\"",
"http://www.sfarts.org/podFotos/take5.jpg",
"http://www.sfarts.org/podFotos/thumb/take5.jpg",
"http://www.sfarts.org/podFotos/large/take5.jpg",
"Dance",
"Sept. 9",
"Take 5",9300,"Heather Desaulniers"]
,
[6,68782,"ODC Theater's \"Take 5\" After witnessing \"in progress\" choreographic and performance excerpts by Amy Foley, Javan Wilson and Casey Thorne, audience members can join in an interactive conversation about the work. One of the three artists will be selected to receive 15 hours of rehearsal time at ODC. \r",
"http://www.sfarts.org/podFotos/take5.jpg",
"http://www.sfarts.org/podFotos/thumb/take5.jpg",
"http://www.sfarts.org/podFotos/large/take5.jpg",
"Dance",
"Sept. 9",
"Take 5",9300,"Heather Desaulniers"
]
]}
