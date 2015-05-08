<?php
/* @var $this UserMovieController */
/* @var $model UserMovie */

$this->breadcrumbs=array(
	'User Movies'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List UserMovie', 'url'=>array('index')),
	array('label'=>'Create UserMovie', 'url'=>array('create')),
	array('label'=>'View UserMovie', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage UserMovie', 'url'=>array('admin')),
);
?>

<h1>Update UserMovie <?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>