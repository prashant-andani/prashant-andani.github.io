<?php
/* @var $this UserMovieController */
/* @var $model UserMovie */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'user-movie-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'user_id'); ?>
		<?php echo $form->textField($model,'user_id'); ?>
		<?php echo $form->error($model,'user_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'movie_id'); ?>
		<?php echo $form->textField($model,'movie_id'); ?>
		<?php echo $form->error($model,'movie_id'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'watch_status'); ?>
		<?php echo $form->textField($model,'watch_status',array('size'=>10,'maxlength'=>10)); ?>
		<?php echo $form->error($model,'watch_status'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'user_comment'); ?>
		<?php echo $form->textField($model,'user_comment',array('size'=>60,'maxlength'=>255)); ?>
		<?php echo $form->error($model,'user_comment'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->