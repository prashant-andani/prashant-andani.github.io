<div class="container">
    <div class="row">
		<div class="col-md-4 col-md-offset-4">
    		<div class="panel panel-default">
			  	<div class="panel-heading">
			    	<h3 class="panel-title">Please sign in with <i class="fa fa-google"></i></h3>
			 	</div>
			  	<div class="panel-body">
			  	<?php


				foreach ($services as $name => $service) {
					if($service->id == "google_oauth"){
						$html = CHtml::link("Google", array($action, 'service' => $name), array(
						'class' => 'auth-link btn btn-danger',));

					}
					else if($service->id=="facebook"){
						$html = CHtml::link("facebook", array($action, 'service' => $name), array(
						'class' => 'auth-link btn btn-primary',));
					}
					
					echo $html;
					echo '<br />------- or ------ <br/>';
				}
				?>
			    </div>
			</div>
		</div>
	</div>
</div>