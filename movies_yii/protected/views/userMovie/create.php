<?php
/* @var $this UserMovieController */
/* @var $model UserMovie */

$this->breadcrumbs=array(
	'User Movies'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List UserMovie', 'url'=>array('index')),
	array('label'=>'Manage UserMovie', 'url'=>array('admin')),
);
?>

<h1>Create UserMovie</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>