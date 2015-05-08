<?php
/* @var $this UserMovieController */
/* @var $data UserMovie */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_id')); ?>:</b>
	<?php echo CHtml::encode($data->user_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('movie_id')); ?>:</b>
	<?php echo CHtml::encode($data->movie_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('watch_status')); ?>:</b>
	<?php echo CHtml::encode($data->watch_status); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_comment')); ?>:</b>
	<?php echo CHtml::encode($data->user_comment); ?>
	<br />


</div>