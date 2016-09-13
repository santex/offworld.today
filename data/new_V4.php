<?php require('/var/www/html/blog/includes/config.php'); 
$case = isset($_REQUEST['case'])?$_REQUEST['case']:1342;
$address="";
$c=0;
$c=rand(0,500)+10;
$stmt = $db->query(sprintf('SELECT caseID,country,city,shape,type,postTitle,postDesc, SUBSTRING_INDEX(urls,"\n",1) as urls,tags,DATE(FROM_UNIXTIME(occurred / 1000)) 
occurred from blog_posts where type!="unknown" and SUBSTRING_INDEX(urls,"\n",1) regexp("jpg$") and favorited="yes" order by postID asc limit %s,%s',$c,isset($_REQUEST['Disp_Num'])?$_REQUEST['Disp_Num']:5));

$all=[];	
	while($row = $stmt->fetch()){

$tags=json_decode($row['tags']);
$t=implode(',',$tags);#,'<span data-role="remove"></span></span>');
$row['tags']=$t;
#echo $t;
$all[]=$row;
}
	
$q = json_decode('{"COLUMNS":["EVENT_NUM","Country","City","shape","type","TITLE","DESC","IMG","TAGS","OCCURRED"],"DATA":[

]}');
$q->DATA=$all;

echo json_encode($q);
?>
