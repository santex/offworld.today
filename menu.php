<div class="menu-bar">
  <div class="relative">
  <ul class="menu-list">
    <li>
        
      <a href="#" class="menu-title">
        <div class="button-wrap"><div href="#" class="btn btn-blend green action-close">Close</div></div>
        Menu
      </a>
    </li>
    <li><a href="index.php" class="">Home</a></li>
    <!--//li><a href="#feature" class="">Editorial</a></li>
    <li><a href="index.php?date=today" onClick="clearState();" class="">Today's Events</a></li>
    <li><a href="index.php?date=weekend" onClick="clearState();" class="">This Weekend</a></li -->
    <li>
      <a href="#" class="">Search by Genre</a>
      <div class="submenu" style="background:#126fdd;">
          <ul class="menu-list">
            <li>
                      
              <a href="#" class="menu-title">
                Select Genre
              </a>
            </li>
          <?php
          $categorys =["abduction","audio","contact","crash","disc","entity","fireball","flash","floating","hovering","landing","light","lights","none","null","photo","police","pulsing","saucer","sound","triangle","ufo","uso","video"];
          foreach($categorys as $key =>$name):
echo <<<EOF
          <li class="menu-pad">
            <a href="index.php?disp={$name}" onClick="clearState();" >{$name}</a>
          </li>
EOF;
 endforeach;?>
          </ul>
        </div>
          
    </li>
    
    <!--li>
      <a href="#date" class="">Search by Date</a>
      <div class="submenu">
        <ul class="menu-list">
          <form method="get" action="index.php">
          <li>       
           
            <a href="#" class="menu-title">
            <div class="button-wrap">
            <button class="btn btn-blend blue action-apply" type="submit" value="Submit">Apply</button>
            </div>
              Select Dates
            </a>
          </li>
          <li class="menu-pad"><input type="text" class="start-date datepicker" placeholder="Start Date (mm/dd/yyyy)" id="date1" name="date1"></li>
          <li class="menu-pad"><input type="text" class="end-date datepicker" placeholder="End Date (mm/dd/yyyy)"  id="date2" name="date2"></li>
          </form>
          
        </ul>  
       </div>   
    </li>
 
    <li>
      <a href="#location" class="">Search by Neighborhood</a>
      <div class="submenu">
        <ul class="menu-list">
          <li>
            <a href="#" class="menu-title">      
              Select Neighborhood
            </a>
          </li>
         <li class="menu-pad">
            <a href="index.php?location=1" onClick="clearState();" >Castro/Noe Valley/Upper Market </a>
          </li>  
        </ul> 
      </div>
    </li>
	 <li><a href="#" class="">Submit Event</a></li>
    <li>
      <a href="#about" class="">About</a>
      <div class="submenu">
        <ul class="menu-list">
          <li><a href="about.cfm">Overview</a></li>
          <li><a href="submission_policy.cfm">Submission Policy</a></li>
          <li><a href="submitEvent.cfm">Submit Event</a></li>
          <li><a href="monthly.cfm" >San Francisco Arts Monthly/Print Version</a></li>
          <li><a href="feedback_support.cfm">Feedback & Support</a></li>
          <li><a href="colophon.cfm">Colophon</a></li>
          
        </ul>
      </div>
    </li -->
    
  </ul>
  </div><!-- /relative -->
</div><!-- /menu-bar -->
