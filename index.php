
<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
  
<head>
  <meta charset="utf-8">

  <title>offworld today</title>
  <!-- meta name="viewport" content="width=device-width, initial-scale=1.0" -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1, user-scalable=no">


  <!-- Loading Bootstrap -->
  <link href="/paper/assets/css/bootstrap.css" rel="stylesheet">

  <!-- Loading Flat UI -->
  <link rel="stylesheet" type="text/css" href="/assets/css/mainDraft.css" />
  
  <!-- Loading SF Icons -->
  <link rel="stylesheet" href="assets/fonts/fontello/css/sfarts_icons.css">
  <link rel="stylesheet" href="assets/fonts/fontello/css/animation.css">
   <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    
  <!--[if IE 7]>
    <link rel="stylesheet" href="fonts/fontello/sfarts_icons-ie7.css">
  <![endif]-->    

  <link rel="shortcut icon" href="/assets/img/favicon.ico">

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
  <!--[if lt IE 9]>
    <script src="/paper/js/html5shiv.js"></script>
  <![endif]-->


<script>

</script>

<style>
	
h2{padding:5px;margin:15px;margin-top:5px;color:#fff;background-color:#000;height:50px;}</style>

</head>
  
<body class="one-spot home">
<div id="loader"><div class="vjs-loading-spinner"></div></div>
<div id="wrapper">
  
<div class="navbar main-menu">
  <ul class="nav">
    <li><a href="#" class="menu-menu sficon-menu" title="Menu"></a></li>
    <li><a href="#/back" onClick="window.history.go(-1);return false;" class="menu-back sficon-left" title="Back"></a></li>
    <li><a href="index.php?do=search&date=today" onClick="clearState();" class="menu-search sficon-search" title="Search"></a></li>
    <li><a href="index.php?do=nearby" class="menu-location sficon-location" title="" data-original-title="Nearby"></a></li>
    <div class="vertical-text">OFFWORLD.Today</div>
   
<a data-click="sidebar-minify" class="sidebar-minify-btn" href="javascript:;"><i class="fa fa-angle-double-left"></i></a>


  </ul>

</div><!-- /navbar -->

<!--<div class="hide search-bar"><input id="global-search-bar" placeholder="Search by Keyword"  /><a id="global-search-submit" onClick="handleGlobalSearchBarClick($('#global-search-bar').val());">Press Enter</a></div>-->
<?php require_once "/var/www/html/paper/menu.php"; ?>
<div class="hide submenu-bar"></div>



<div id="bounds">
  <div class="header">
  </div>
    
  <div id="main-wrap">
    <div class="inner-wrap scroll-pane overthrow">
      <div id="top-left" class="spot scroll-pane overthrow">
        <div class="spothead">
          <h3 class="title">Features</h3>
        </div><!-- /spothead -->
        <div class="inner">  
        </div><!-- .inner -->  
      </div><!-- /#top-left -->
      <div class="middle-center-bottom-right overthrow">
        <div id="middle-center" class="spot scroll-pane overthrow">
          
            <div class="slideshow">
              <div class="slideshow-top">
                <h5 class="type">Story's</h5>
              <br></div> 
               
              <div class="slide" style="background-image:url(/paper/assets/img/editorial_images/1.jpg);">
                  
                
                
                  
              </div><!-- /slide -->
               
              <div class="slide" style="background-image:url(/paper/assets/img/editorial_images/2.jpg);">
                  
              </div><!-- /slide -->
               
              <div class="slide" style="background-image:url(/paper/assets/img/editorial_images/3.jpg);">
                
                  
              </div><!-- /slide -->
               
              <div class="slide" style="background-image:url(/paper/assets/img/editorial_images/4.jpg);">
                  
                
                
                
                           
             </div><!-- /slideshow -->
               
               <div class="cycle-pager"></div>
                          
             </div><!-- /slideshow -->
               
              
            <div class="highlights ">
              <div class="handle"></div>
              <div class="drawer"></div>
              <div class="inside">
                <div class="categories">
                  
                      <a name="highlights"></a>
                   <h5><a href="#highlights">Sighting's</a></h5>
                  <select name="dispCBO"   onChange="getDispCombo(this);">
                    <option value="98" >Now/Soon</option>
				
          <?php
          $categorys =["photo","video","fireball","triangle","disc","entity","abduction","police","military"];
          foreach($categorys as $key =>$name):
          
echo <<<EOF
  <option value="{$key}">{$name}</option>
  
  
  
EOF;
 endforeach;?>
              
                  
                  </select>
                  <ul class="hide cat-list">
               <li class="first all" id="99"><a href="#" onClick="dispPod=5;getPods(5);getDispInfo(5);">Current/Soon</a></li>
             <?php
          foreach($categorys as $key =>$name):

$name=strtoupper($name);
echo <<<EOF
  <li style="text-size:12px" id="{$key}"><a href="#" onClick="dispPod={$key};getPods({$key});getDispInfo({$key});">{$name}</a></li>
EOF;
 endforeach;?>
                 
                  </ul>
                  <div class="sponsored">
                  
                    
                  </div>
                </div>
                     
                <div class="browse">
                  <div class="load-wrap">
                    <div class="hide browse-top hide"></div>

<ul class="pods grid-view" id="grid-view"></ul>
<script id="pods-template" type="x-handlebars-template">
{{#each data}}
<li class="pod" style="text-align:left;">
<a href="index.php?event_num={{event_num}}" class="link" style="position: absolute; left: 0px; top: 0px;">									
<div class="pad">
<div style="width:100%;">
<div  style="width:100%;float:left;font-size:0.9em;color:black;"><b>{{occurred}}</b>              <div class='pull-right' style="color:blue;"> <b>{{country}} / {{city}}</b></div></div>

<div class="detail image"><img class="pod-img" src={{img}}  alt="image title"/></div>
<span class="label label-warning">{{shape}}</span><br><div class="detail description">{{desc}}</div>  

</div>

</div>
</a>
</li>	
{{/each}}
</script>




                 
                   
                  </div><!-- load-wrap -->
                </div><!-- browse -->
              </div><!-- inside -->
            </div><!-- /highlights -->  
              
              
        </div><!-- /#middle-center -->
        
        <div id="bottom-right" class="spot scroll-pane overthrow">
          <div class="spothead">
            <h5 class="title"></h5>
          </div>
          <div class="inner">
    
          </div><!-- /.inner -->    
        </div><!-- /#bottom-right -->
  
      </div><!--/#middle-center-bottom-right -->
      <!--<div class="overlay"></div>-->
    </div><!-- /.inner-wrap -->
  </div><!-- /#main-wrap -->
</div><!--/ #bounds -->

</div><!-- /#wrapper -->

  <!-- Load JS here for best performance -->
  
  <script type="text/javascript">
      less = {
          env: "production", // or "production" or development
          dumpLineNumbers: "mediaquery"
      };
  </script>
  
 

  <script src="/assets/js/jquery/1.8.3/jquery-1.8.3.js"></script>
  
  <script>
  //$('#loader').show(); 
  </script>)	
  <script src="/paper/assets/js/jquery-ui.min.js"></script>
  <script src="/paper/assets/js/bootstrap.min.js"></script>
  <script src="/paper/assets/js/response.min.js"></script>  
  <script src="/paper/assets/js/compressed.js"></script>
  <script src="/paper/assets/js/custom.js"></script>
   <script src="/paper/assets/js/Handlebars.js"></script>
	 <script src="/paper/assets/js/moment.js"></script>
	<script src="/paper/assets/js/jquery.serializecfjson-0.2.min.js"></script>
	<script type="text/javascript" src="/paper/assets/js/sfARTS.js"></script>  
  
 
 
 
 
 
   <script type="text/javascript">
  $('#loader').show();
$('.pdfArea').hide();

  $(document).ready(function(e) {


	
	$(window).bind('resize', function () { 
console.log($("#grid-view").innerWidth());

$.each(input), function ( i, id ) {
			console.log(i);//$('#'+id+' td.details-control').trigger( 'click' );
		} );
		
			if($("#grid-view").innerWidth()<300){
	$(".pods.grid-view .pod a.link").css('width',"98%");
	
	}else{
		$(".pods.grid-view .pod a.link").css('width',"48%");
	}

});


	 $('#loader').show();   
    	$('.pdfArea').show();
   

  onIndexPageLoad();
  checkDatesInBookmarks();
	
	
});

  
</body>
</html>
